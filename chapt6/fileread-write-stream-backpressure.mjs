import * as fs from 'fs'

const readableStream = fs.createReadStream('input.txt', "utf-8")
const writableStream = fs.createWriteStream('output.txt', 'utf-8')


readableStream.on('data', chunk => {
    console.log('reading chunk', chunk)
    writableStream.write(chunk, 'utf-8')
})

//or

readableStream.on('readable', ()=> {
    let chunk;

    while((chunk=readableStream.read()) !== null){
        const shouldWrite = writableStream.write(chunk, 'utf-8')

        if(!shouldWrite){
            console.log("There is backpressure")
            readableStream.pause()
            break
        }else{
            console.log("Chunk written", chunk)
        }
        
    }
})

writableStream.on('drain', () => {
    console.log('writable stream buffer drained')
    readableStream.resume()
})

readableStream.on('error', () => {
    console.log('Error reading file:', file)
})

readableStream.on('end', () => {
    console.log('Stream has been fully read')
})

writableStream.on('error', (err) => {
    console.error('Error writing file:', err);
});
