import concatFiles from "./chapt4_4.1.mjs";

const destFile = process.argv[2]
const cb = (err) => {
    if(err){
        console.error("an error occurred", err)
    }
    console.log("all files have been concatenated")
} 
const files = process.argv.slice(3) ? process.argv.slice(3) : []
concatFiles(destFile, cb, ...files)

