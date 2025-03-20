import { resolve } from 'path';

export function createFSAdapter(db) {
    return ({
        readFile(filename, options, cb) {
            if (typeof options === 'function') {
                cb = options
                options = {}
                //call of read file with (filename, cb), correctly setting cb to cb
            } else if (typeof options === 'string') {
                options = { encoding: options }
            }
            db.get(resolve(filename), { valueEncoding: options.encoding }, (err, value) => {
                console.log('reading ', filename)
                if (err) {
                    if (err.type === "NotFoundError") {
                        err = new Error(`ENOENT, open '${filename}'`)
                        err.code = 'ENOENT'
                        err.errno = 34
                        err.path = filename
                    }
                    return cb && cb(err)
                }
                cb && cb(null, value)
            })
        },
        writeFile(filename, contents, options, cb) {
            if (typeof options === 'function') {
                cb = options
                options = {}
            } else if (typeof options === 'string') {
                options = { encoding: options }
            }
            db.put(resolve(filename), contents, { valueEncoding: options.encoding }, (err) => {
                if (err) {
                    return cb && cb(err);
                }
                cb && cb(null);
            })
        }
    })
}