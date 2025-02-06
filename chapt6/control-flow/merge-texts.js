import { createReadStream, createWriteStream } from 'fs'
import split from 'split'
const dest = process.argv[2]
const sources = process.argv.slice(3)


const destStream = createWriteStream(dest)

let finished = 0

for (const source in sources){
    const sourceStream = createReadStream(source)
    sourceStream.on('end', () => {
        finished++
        if(finished === sources.length){
            destStream.end()
            console.log(`${dest} created`)
        }
    })
    sourceStream.pipe(split(line => line + '\n'))
        .pipe(destStream, {end: false})
}

//NOTE THIS IS UNORDERED, CONCURRENT PIPING MEANING THE ORDER IS LOST