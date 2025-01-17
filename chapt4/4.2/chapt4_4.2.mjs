import fs from 'fs';
import { TaskQueue } from '../../taskqueue.mjs';
export function listNestedFiles(dir, cb, concurrency = 3){
    const queue = new TaskQueue(concurrency)
    const files = []
    function findFiles(nesting, directory){
        fs.readdir(directory, (err, files) => {
            if(err){
                return cb(err)
            }
            files.forEach(file => {
                const fullPath = path.join(dir, file)
                queue.pushTask((done) => {
                    fs.stat(fullPath, (err, stats) => {
                    if(err){
                       return done(err) 
                    }
                    if(stats.isDirectory){
                        findFiles(nesting + 1, fullPath)
                    }else if (stats.isFile){
                        files.push({path: fullPath, nesting: nesting})
                    }
                    done()
                })
                

                })

            })
        })
    }

    findFiles(dir)

    queue.on('empty', () => cb(null, files))
    queue.on('error', cb(err))
}