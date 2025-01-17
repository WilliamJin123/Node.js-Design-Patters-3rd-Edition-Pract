import fs from 'fs';

export default function concatFiles(destFile, cb, ...fileNames) {
    function iterate(index) {
        if (index == fileNames.length) {
            return cb()
        }

        fs.readFile(fileNames[index], 'utf8', (err, data) => {
            if (err) { return cb(err) }
            
            fs.appendFile(destFile, '\n' + data, (err) => {
                if (err) { return cb(err) }
                console.log(`file ${fileNames[index]} appended`)
                iterate(index + 1)
            })
        })
    }

    iterate(0)

}