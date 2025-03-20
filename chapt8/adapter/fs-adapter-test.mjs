// import fs from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Level } from 'level'
import { createFSAdapter } from './fs-adapter.mjs'
const __dirname = dirname(fileURLToPath(import.meta.url))
const db = new Level(join(__dirname, 'db'), {
    valueEncoding: 'binary'
})
console.log("Creating FS Adapter...");
const fs = createFSAdapter(db);
console.log("FS Adapter created:", fs);

fs.writeFile('file.txt', 'Hello!', () => {
    fs.readFile('file.txt', { encoding: 'utf8' }, (err, res) => {
        if (err) {
            return console.error(err)
        }
        console.log(res)
    })
})
// try to read a missing file
fs.readFile('missing.txt', { encoding: 'utf8' }, (err, res) => {
    console.error(err)
})