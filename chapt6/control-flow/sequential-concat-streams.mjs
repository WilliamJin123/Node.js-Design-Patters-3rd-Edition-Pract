import { createWriteStream, createReadStream } from 'fs'
import { Readable, Transform } from 'stream'

export function concatFiles(dest, files) {
    return new Promise((resolve, reject) => {
        const destStream = createWriteStream(dest)
        Readable.from(files)
            .pipe(
                new Transform({
                    objectMode:true,
                    transform(file, enc, cb){
                        const src = createReadStream(file)
                        src.pipe(destStream, {end:false})
                        src.on('error', error => cb(error))
                        src.on('end', done)
                    }
                })
            ).on('error', reject)
            .on('finish', () => {
                destStream.end()
                resolve()
            })
    })
}