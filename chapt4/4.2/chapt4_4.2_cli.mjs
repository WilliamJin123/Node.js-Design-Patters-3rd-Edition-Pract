import { listNestedFiles } from "./chapt4_4.2.mjs";

const dir = process.argv[2]
const concurrency = process.argv[3] || 3
const cb = (err, files) => {
    if(err){
        console.error("an error occurred", err)
    }
    files.forEach(file => {
        console.log(`file path: ${file.path}`)
        console.log(`file depth: ${file.depth}`)
    });
        
    
    console.log("all files have been listed")
}

listNestedFiles(dir, cb, concurrency)