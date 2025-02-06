import parallelTransform from 'parallel-transform'
import { pipeline } from 'stream'
import { createReadStream, createWriteStream } from 'fs'
import split from 'split'
import superagent from 'superagent'


pipeline(
    createReadStream(process.argv[2]),  
    split(),
    parallelTransform(3, async function (url, done){
        if(!url){
            return done()
        }
        console.log(url)
        try{
            await superagent.head(url, {timeout: 5 * 1000})
            this.push(`${url} is up\n`)
        }catch(err){
            this.push(`${url} is down\n`)
        }finally{
            done()
        }
    }),
    createWriteStream('results.txt'),
    (err) => {
        if(err){
            console.log(err)
            process.exit(1)
        }
        console.log('All urls have been checked')
    }
)
