import { UpperCaseStream } from "./transform-stream-ex.mjs"
import { createGzip, createGunzip } from 'zlib'
import { Transform, pipeline } from 'stream'

pipeline(process.stdin,
    createGunzip(),
    new UpperCaseStream(),
    createGzip(),
    process.stdout,
    (err) => {
        if(err){
            console.log(err)
            process.exit(1)
        }
        console.log('success!')
    }

)