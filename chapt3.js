// 3.1 A simple event: Modify the asynchronous FindRegex class so that it
// emits an event when the find process starts, passing the input files list as
// an argument. Hint: beware of Zalgo!


import { EventEmitter } from 'events'
import { readFile } from 'fs'
class FindRegex extends EventEmitter {
    constructor(regex) {
        super()
        this.regex = regex
        this.files = []
    }
    addFile(file) {
        this.files.push(file)
        return this
    }
    find() {
        process.nextTick(() => this.emit('start', this.files)) //modified line
        for (const file of this.files) {
            readFile(file, 'utf8', (err, content) => {
                if (err) {
                    return this.emit('error', err)
                }
                this.emit('fileread', file)
                const match = content.match(this.regex)
                if (match) {
                    match.forEach(elem => this.emit('found', file, elem))
                }
            })
        }
        return this
    }
}

/*3.2 Ticker: Write a function that accepts a number and a callback as the
arguments. The function will return an EventEmitter that emits an event
called tick every 50 milliseconds until the number of milliseconds is passed
from the invocation of the function. The function will also call the callback
when the number of milliseconds has passed, providing, as the result, the total
count of tick events emitted. Hint: you can use setTimeout() to schedule
another setTimeout() recursively.*/
function ticker(time, cb) {
    const emitter = new EventEmitter()
    let count = 0;

    /*3.4 Playing with errors: Modify the function created in exercise 3.3 so that
it produces an error if the timestamp at the moment of a tick (including the
initial one that we added as part of exercise 3.3) is divisible by 5. Propagate
the error using both the callback and the event emitter. Hint: use Date.now()
to get the timestamp and the remainder (%) operator to check whether the
timestamp is divisible by 5. */
    function Emit() {
        if (Date.now() % 5 == 0) {
            emitter.emit('tick')
        } else {
            emitter.emit('error')
        }
    }
    /*3.3 A simple modification: Modify the function created in exercise 3.2 so that
it emits a tick event immediately after the function is invoked. */
    process.nextTick(() => {
        count++
        Emit()
    })
    const interval = setInterval(() => {
        count++
        Emit()


    }, 500)
    setTimeout(() => {
        clearInterval(interval)
        cb(count)
    }, time + 100)
    return emitter;
}

ticker(2000, (count) => { console.log(`The tick happened ${count} times`) }).on('tick', () => console.log('tick')).on('error', () => console.log('tick is error-y'))