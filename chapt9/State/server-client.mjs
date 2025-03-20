import jsonOverTcp from 'json-over-tcp-2'
const server = jsonOverTcp.createServer({ port: 5000 })
server.on('connection', socket => {
    socket.on('data', data => {
        console.log('Client data', data)
    })
})
server.listen(5000, () => console.log('Server started'))

import { FailsafeSocket } from './socket.mjs'
const failsafeSocket = new FailsafeSocket({ port: 5000 })
setInterval(() => {
    // send current memory usage
    failsafeSocket.send(process.memoryUsage())
}, 1000)