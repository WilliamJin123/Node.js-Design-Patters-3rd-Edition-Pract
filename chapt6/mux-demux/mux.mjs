import { fork } from 'child_process'
import { connect } from 'net'

function multiplexChannels(srcs, dest) {
    let openChannels = srcs.length
    for (let i = 0; i < openChannels; i++) {
        sources[i]
            .on('readable', function () {
                let chunk
                while ((chunk = this.read()) !== null) {
                    const outBuff = Buffer.alloc(1 + 4 + chunk.length) // (2)
                    outBuff.writeUInt8(i, 0)
                    outBuff.writeUInt32BE(chunk.length, 1)
                    chunk.copy(outBuff, 5)
                    console.log(`Sending packet to channel: ${i}`)
                    dest.write(outBuff)
                }
            })
            .on('end', err => {
                if (--openChannels === 0) {
                    dest.end()
                }
            })
    }
}
const socket = connect(3000, () => { 
    const child = fork( 
        process.argv[2],
        process.argv.slice(3),
        { silent: true }
    )
    multiplexChannels([child.stdout, child.stderr], socket)
})