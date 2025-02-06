import { createReadStream, createWriteStream, statSync } from 'fs';
import { createBrotliCompress, createDeflate, createGzip } from 'zlib';
import { pipeline } from 'stream';
import { performance } from 'perf_hooks';


function compressFile(inputFile, outputFile, compressStream) {
    const startTime = performance.now()
    return new Promise((resolve, reject) => {
        pipeline(createReadStream(inputFile), compressStream, createWriteStream(outputFile),
            (err) => {
                if (err) {
                    return reject(err)
                }
                const endTime = performance.now()
            })
        const duration = (endTime - startTime) / 1000
        resolve({ duration: duration, size: fs.statSync(outputFile).size })
    })
}



const filePath = process.argv[2]
