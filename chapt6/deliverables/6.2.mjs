import { createReadStream, createWriteStream, } from 'fs';
import { validateHeaderName } from 'http';
import readline from 'readline';
import { pipeline, Transform, PassThrough } from 'stream'


const filePath = "./london_crime_by_lsoa.csv"

const fileStream = createReadStream(filePath)
const rl = readline.createInterface({
    input:fileStream,
    crlfDelay: Infinity,
})

const crimesPerYear = {}
const dangerousAreas = {}
const commonCrimePerArea = {}
let firstLine = true

const parseStream = new Transform({
    objectMode:true,
    transform(chunk, enc, done) {
        if(firstLine) {
            firstLine = false
            return done()
        }
        const data = chunk.toString().split(',')
        const dataObj = {
            id: data[0],
            borough:data[1],
            majorCategory:data[2],
            minorCategory:data[3],
            value:parseInt(data[4], 10),
            year:data[5],
            month:data[6]
        }
        this.push(dataObj)
        done()
    }
})

const processStream = new PassThrough({
    objectMode:true
})
processStream.on('readable', () => {
    let chunk;
    while((chunk = processStream.read()) !== null){
        const {id, borough, majorCategory, minorCategory, value, year, month} = chunk
        if(!crimesPerYear[year]){
            crimesPerYear[year] = 0
        }
        crimesPerYear[year] += value
        if(!dangerousAreas[borough]){dangerousAreas[borough] = 0}
        dangerousAreas[borough] += value
        if(!commonCrimePerArea[borough]){commonCrimePerArea[borough] ={}}
        if(!commonCrimePerArea[borough][majorCategory]){commonCrimePerArea[borough][majorCategory] = 0}
        commonCrimePerArea[borough][majorCategory] += value
        console.log(`added crime ${id} to stats`)
    }
   
})

processStream.on('finish', () => {
    console.log("Crime Trend by Year:", crimesPerYear);
    console.log("Most Dangerous Areas:", Object.entries(dangerousAreas).sort((a, b) => b[1] - a[1]).slice(0, 5));
    console.log("MOST COMMON CRIMES PER AREA")
    for(const key in commonCrimePerArea){
        console.log(`${key}: ${Object.entries(commonCrimePerArea[key]).sort(([, a], [ ,b]) => b-a)[0]}`)
    }
    console.log("MOST UNCOMMON CRIMES PER AREA")
    for(const key in commonCrimePerArea){
        console.log(`${key}: ${Object.entries(commonCrimePerArea[key]).sort(([, a], [ ,b]) => a-b)[0]}`)
    }
})


pipeline(rl, parseStream, processStream, (err) => {
    if(err){
        console.log(err)
        process.exit(1)
    }
    console.log('Success')
})