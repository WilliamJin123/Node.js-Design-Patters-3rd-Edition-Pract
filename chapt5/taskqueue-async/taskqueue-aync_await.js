import { EventEmitter } from "events";

export class TaskQueue extends EventEmitter{
    constructor(concurrency){
        super()
        this.concurrency = concurrency
        this.queue = []
        this.running = 0
    }
    pushTask(task) {
        this.queue.push(task)
        return process.nextTick(this.next.bind(this))
    }
    async runTask(task){
        return new Promise((resolve, reject) => {
            this.queue.push(async () => {
                try{
                    const result = await task()
                    resolve(result)
                }catch(err){
                    reject(err)
                }
            })
        })
    }
    async next() {
        while(this.running < this.concurrency && this.queue.length){
            task = this.queue.shift()
            this.runnning++
            try{
                this.emit('taskStart', {active: this.running, size :this.queue.length()})
                await task()
                this.emit('taskStart', {active: this.running-1, size :this.queue.length()})
            }catch(err){
                this.emit("Error", err)
            }finally{
                this.running--
                this.next()
            }
            
        }
    }
}