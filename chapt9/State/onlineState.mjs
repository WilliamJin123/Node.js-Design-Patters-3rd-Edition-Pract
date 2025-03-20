export class OnlineState {
    constructor(failsafeSocket) {
        this.failsafeSocket = failsafeSocket
        this.hasDisconnected = false
    }
    send(data) { // (1)
        this.failsafeSocket.queue.push(data)
        this._safeWrite(data)
    }
    _safeWrite(data) { // (2)
        this.failsafeSocket.socket.write(data, (err) => {
            if (!this.hasDisconnected && !err) {
                this.failsafeSocket.queue.shift()
            }
        })
    }
    activate() { // (3)
        this.hasDisconnected = false
        for (const data of this.failsafeSocket.queue) {
            this._safeWrite(data)
        }
        this.failsafeSocket.socket.once('error', () => {
            this.hasDisconnected = true
            this.failsafeSocket.changeState('offline')
        })
    }
}