import http from 'http'


class TamperFreeQueue{
    #queue = [];
    #promiseQueue = []
    dequeue(){
        
        return new Promise((resolve, reject) => {
            if(this.#queue.length === 0){
                this.#promiseQueue.push(resolve)
            }else{
                resolve(this.#queue.shift()).bind(this)
            }
        })  
    }
    constructor(executor){
        const enqueue = (item) => {
            if(this.#promiseQueue.length > 0){
                const toResolve = this.#promiseQueue.shift()
                toResolve(item)
            }else{
                this.#queue.push(item)
            }
            
        }

        executor(enqueue)
    }
}


const taskQueue = new TamperFreeQueue((enqueue) => {
    const server = http.createServer((req, res) => {
        if(req.method === 'POST'){
            let body = ''
            req.on('data', chunk => {
                body += chunk.toString()
            })
            req.on('end', () => {
                try{
                    enqueue(body)
                    res.writeHead(200)
                    res.end(JSON.stringify({ message: 'Task added to queue' }))
                }catch{
                    res.writeHead(400)
                    res.end(JSON.stringify({error: 'Error adding task to queue'}))
                }
            })
        }else{
            res.writeHead(405)
            res.end(JSON.stringify({error: 'Method not allowed'}))
        }
    })

    server.listen(3000, () => {
        console.log('server is running')
    })


    
})

async function processQueue() {
    while(true){
        const message = await taskQueue.dequeue()
        console.log(message)
    }
}

processQueue()





