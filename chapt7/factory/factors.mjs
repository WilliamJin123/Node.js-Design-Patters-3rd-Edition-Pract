import { createProfiler } from "./profiler.mjs";

function getAllFactors(integer) {
    const profiler = createProfiler(
        `Finding all factors of ${integer}`)
    profiler.start()
    const factors = []
    for (let factor = 2; factor < integer; factor++){
        if(integer % factor === 0){
            factors.push(factor)
            integer = integer / factor
        }
    }
    profiler.end()
    return factors
}

const num = process.argv[2]
const factors = getAllFactors(num)
console.log('factors:', factors)