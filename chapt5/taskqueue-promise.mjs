import {EventEmitter} from 'events'

export class TaskQueue extends EventEmitter {
    constructor(concurrency) {
        super()
        this.concurrency = concurrency
        this.running = 0
        this.queue= []

    }

    pushTask(task){
        this.queue.push(task)
        process.nextTick(this.next.bind(this))
        return this
    }

    runTask(task){
        return new Promise((resolve, reject) => {
            this.queue.push(() => {
                return task().then(resolve, reject)
            })
            process.nextTick(this.next.bind(this))
        })
    }

    next(){
        while(this.running < this.concurrency && this.queue.length){
            const task = this.queue.shift()
            task().finally(() => {
                this.running--
                this.next()
            })
            this.running++
        }
        
    }
}