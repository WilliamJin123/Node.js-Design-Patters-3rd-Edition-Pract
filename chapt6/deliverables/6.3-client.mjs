// client side - multiplexing

import { fork } from 'child_process'
import { connect } from 'net'
import crypto from 'crypto'
import SECRET_KEY from './6.3-key.mjs';


const IV = crypto.randomBytes(16);

function encryptData (chunk) {
    const cipher = crypto.createCipheriv("aes-256-ocb", SECRET_KEY, IV)
    let encrypted = cipher.update(chunk)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    
    return Buffer.concat([IV, encrypted])
}



function multiplexChannels(srcs, dest) {
    let openChannels = srcs.length
    for(let i = 0; i < srcs.length; i++){
        srcs[i].on('readable', () => {
            let chunk
            while((chunk = this.read()) !== null) {
                const fileName = process.argv[i + 3];
                const fileNameBuffer = Buffer.from(fileName, 'utf-8');
                const fileNameLength = fileNameBuffer.length;


                const outBuff = Buffer.alloc(4 + fileNameLength + 4 + chunk.length)
                const encryptedChunk = encryptData(chunk)
                outBuff.writeUint32BE(fileNameLength, 5);
                fileNameBuffer.copy(outBuff, 9)
                outBuff.writeUint32BE(chunk.length, 1)
                encryptedChunk.copy(outBuff, fileNameLength+9)

                console.log(`Sending packet to channel: ${i}, file: ${fileName}`);

                dest.write(outBuff)
                
            }
        }).on('end', () => {
            if(--openChannels === 0){
                dest.end()
            }
        })
    }
}

const socket = connect(3000, () => {
    const child = fork(
        process.argv[2],
        process.argv.slice(3),
        {silent: true}
    )
    const fileStreams = process.argv.slice(3).map(filePath => {
        return createReadStream(filePath);
    });
    multiplexChannels(fileStreams, socket)
})