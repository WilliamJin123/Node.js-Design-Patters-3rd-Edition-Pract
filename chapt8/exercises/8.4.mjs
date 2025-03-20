// 8.4 Virtual filesystem: Modify our LevelDB filesystem adapter example to
// write the file data in memory rather than in LevelDB. You can use an object
// or a Map instance to store the key-value pairs of filenames and the associated
// data.
import { resolve } from 'path';

class FStoMemAdapter {
    constructor() {
        this.files = {}
    }

    writeFile(filename, contents, options, cb) {
        if (typeof options === 'function') {
            cb = options
            options = {}
        } else if (typeof options === 'string') {
            options = { encoding: options }
        }
        this.files[resolve(filename)] = contents;
        return cb && cb(null, filename)
    }
    readFile(filename, options, cb) {
        if (typeof options === 'function') {
            cb = options
            options = {}
        } else if (typeof options === 'string') {
            options = { encoding: options }
        }
        const file = this.files[resolve(filename)];
        if (!file) {
            err = new Error(`ENOENT, open '${filename}'`)
            err.code = 'ENOENT'
            err.errno = 34
            err.path = filename
            return cb && cb(err)
        }
        return cb && cb(null, file, filename)
    }
}


const fs = new FStoMemAdapter();
fs.writeFile("example.txt", "Hello, world!", (err, file) => {
    if(err){
        console.error(err)
    }else{
        console.log(`File written: ${file}`);
    }
    
});
console.log(fs.readFile("example.txt", (err, file, filename) => {
    if(err){
        console.error('Error:', err)
    }else{
        console.log(`${filename} contains: ${file}`);
    }
}));