import { Transform } from 'stream'

export class LimitedParallelStream extends Transform {
    constructor(userTransform, concurrency, options) {
        super({ objectMode: true, ...options })
        this.userTransform = userTransform
        this.concurrency = concurrency
        this.running = 0
        this.continueCb = null
        this.terminateCb = null
    }

    _transform(chunk, enc, done){
        this.running++
        
        this.userTransform(
            chunk,
            enc,
            this.push.bind(this),
            this._onComplete.bind(this)
        )
        if(this.running < this.concurrency){
            done()
        }else{
            this.continueCb = done()
        }
        
    }

    _flush(cb){
        if(this.running > 0){
            this.terminateCb = cb
        }else{
            cb()
        }
    }

    _onComplete(err){
        this.running--
        if(err){
            console.log(err)
            return this.emit('error', err)
        }
        const cb = this.continueCb
        cb && cb()
        if(this.running === 0) {
            this.terminateCb && this.terminateCb()
        }
    }
}