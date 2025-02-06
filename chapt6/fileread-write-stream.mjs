const fs = require('fs')

const readableStream = fs.createReadStream('input.txt', "utf-8")
const writableStream = fs.createWriteStream('output.txt', 'utf-8')


readableStream.on('data', chunk => {
    console.log('reading chunk', chunk)
    writableStream.write(chunk, 'utf-8')
})

//or

readableStream.on('readable', ()=> {
    let chunk;

    while(chunk=readableStream.read() !== null){
        writableStream.write(chunk, 'utf-8')
    }
})

readableStream.on('error', () => {
    console.log('Error reading file', file)
})

readableStream.on('end', () => {
    console.log('Stream has been fully read')
})


