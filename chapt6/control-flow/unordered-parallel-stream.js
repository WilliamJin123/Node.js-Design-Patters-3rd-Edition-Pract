import {Transform} from 'stream'

export class ParallelStream extends Transform {
    constructor(userTransform, options){
        super({objectMode:true, ...options})
        this.userTransform = userTransform
        this.running = 0
        this.terminateCb = null
    }

    _transform(chunk, enc, cb){
        this.running++
        this.userTransform(
            chunk, enc, this.push.bind(this), this._onComplete.bind(this)
        )
        cb()
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
            return this.emit('error', err)
        }
        if(this.running == 0){
            this.terminateCb && this.terminateCb();
        }

    }
}