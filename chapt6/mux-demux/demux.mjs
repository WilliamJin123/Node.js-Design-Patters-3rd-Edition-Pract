import { createWriteStream } from 'fs'
import { createServer } from 'net'

function demultiplexChannel(source, dests) {
    let currentChannel = null
    let currentLength = null
    source.on('readable', function () {
        let chunk
        if (currentChannel === null) {
            chunk = source.read(1)
            currentChannel = chunk && chunk.readUInt8(0)
        }
        if (currentLength === null) {
            chunk = source.read(4)
            currentLength = chunk && chunk.readUInt32BE(0)
            if (currentLength === null) {
                return null
            }
        }
        chunk = source.read(currentLength)
        if (chunk === null) {
            return null
        }
        console.log(`Received packet from: ${currentChannel}`)
        destinations[currentChannel].write(chunk)
        currentChannel = null
        currentLength = null
    }).on('end', () => {
        destinations.forEach(destination => destination.end())
        console.log('Source channel closed')
    })
}