// Server side
import crypto from 'crypto'
import { createWriteStream, createReadStream, existsSync, writeFileSync } from 'fs'
import { createServer } from 'net'
import SECRET_KEY from './6.3-key.mjs'

function decryptData(chunk) {
    const iv = chunk.slice(0, 16)
    const encryptedData = chunk.slice(16)
    const decipher = crypto.createDecipheriv('aes-256-ocb', SECRET_KEY, iv)
    let decrypted = decipher.update(chunk)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted
}

function demultiplexChannel(src) {
    let currentChannel = null
    let currentLength = null
    let currentFileLength = null
    let curFileName = null
    const dests = {}

    src.on('readable', () => {
        let chunk

        if (currentFileLength === null) {
            chunk = src.read(4)
            currentFileLength = chunk && chunk.readUInt32(0)
            if (currentFile === null) {
                return null
            }
        }

        if (curFileName === null) {
            chunk = src.read(currentFileLength)
            curFileName = chunk.toString()
            if (curFileName === null) {
                return null
            }
        }
        if (currentLength === null) {
            chunk = src.read(4)
            currentLength = chunk && chunk.readUInt32(0)
            if (currentLength === null) {
                return null
            }
        }

        chunk.read(currentLength)
        if (chunk === null) {
            return null
        }
        console.log(`Received packet from: ${currentChannel}, writing to file ${curFileName}`)
        if (dests[curFileName] === undefined) {
            if (!existsSync(curFileName)) {
                writeFileSync(curFileName)
            }
            dests[curFileName] = createWriteStream(curFileName)
        }
        const decryptedChunk = decryptData(chunk)
        dests[curFileName].write(decryptedChunk)
        currentChannel = null
        currentLength = null
        currentFileLength = null
        curFileName = null

    }).on('end', () => {
        for(const value in Object.values(dests)){
            value.end()
        }
        console.log('source channel closed')
    })
}

const server = createServer((socket) => {
    demultiplexChannel(socket)

})
server.listen(3000, () => {console.log("Server started")})




