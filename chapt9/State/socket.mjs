import { OfflineState } from './offlineState.mjs'
import { OnlineState } from './onlineState.mjs'

export class FailsafeSocket {
    constructor(options) { // (1)
        this.options = options
        this.queue = []
        this.currentState = null
        this.socket = null
        this.states = {
            offline: new OfflineState(this),
            online: new OnlineState(this)
        }
        this.changeState('offline')
    }
    changeState(state) { // (2)
        console.log(`Activating state: ${state}`)
        this.currentState = this.states[state]
        this.currentState.activate()
    }
    send(data) { // (3)
        this.currentState.send(data)
    }
}