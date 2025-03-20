import { createWriteStream } from 'fs'

export function createLoggingWritable(writable) {
    return new Proxy(writable, { // (1)
        get(target, propKey, receiver) { // (2)
            if (propKey === 'write') { // (3)
                return function (...args) { // (4)
                    const [chunk] = args
                    console.log('Writing', chunk)
                    return writable.write(...args)
                }
            }
            return target[propKey] // (5)
        }
    })
}

const writable = createWriteStream('test.txt')
const writableProxy = createLoggingWritable(writable)
writableProxy.write('First chunk')
writableProxy.write('Second chunk')
writable.write('This is not logged')
writableProxy.end()