import fs from 'fs';
import { TaskQueue } from '../../taskqueue.mjs';
import path from 'path';
export function listNestedFiles(dir, cb, concurrency) {
    const queue = new TaskQueue(concurrency)
    const listFiles = []
    function findFiles(nesting, directory) {
        queue.pushTask(done => {
            fs.readdir(directory, (err, files) => {
                if (err) {
                    return done(err)
                }

                let pending = files.length

                if (pending === 0) {
                    done()
                    return
                }
                files.forEach(file => {
                    const fullPath = path.join(directory, file)
                    fs.stat(fullPath, (err, stats) => {
                        if (err) {
                            return done(err)
                        }
                        if (stats.isDirectory()) {
                            findFiles(nesting + 1, fullPath)
                        } else if (stats.isFile()) {
                            
                            listFiles.push({ 
                                path: fullPath, 
                                depth: nesting 
                            })
                        }
                        if(--pending === 0) {done()}
                    })
    
                })
            })
        })
        
    }

    findFiles(0, dir)

    queue.on('empty', () => {cb(null, listFiles)})
    queue.on('error', (err) => cb(err))
}