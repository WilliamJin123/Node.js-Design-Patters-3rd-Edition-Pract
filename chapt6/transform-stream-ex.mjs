import {Transform} from 'stream'

export class UpperCaseStream extends Transform {
    constructor(options){
        super({...options})
    }
    _transform(chunk, encoding, callback){
        const toUpper = chunk.toString().toUpperCase()
        this.push(toUpper)
        callback()
    }
    _flush(callback){
        this.push('END')
        callback()
    }

}

//OR

// const UpperCaseStream = new Transform({
//     defaultEncoding:'utf-8',

//     transform(chunk, encoding, callback){
//         const toUpper = chunk.toString().toUpperCase()
//         this.push(toUpper)
//         callback()
//     },
//     flush(callback){
//         this.push('END')
//         callback()
//     }
// })

