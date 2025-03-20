// 8.1 HTTP client cache: Write a proxy for your favorite HTTP client library
// that caches the response of a given HTTP request, so that if you make
// the same request again, the response is immediately returned from the
// local cache, rather than being fetched from the remote URL. If you need
// inspiration, you can check out the superagent-cache module (nodejsdp.
// link/superagent-cache).
import axios from 'axios'
class Cache {
    constructor() {
        this.cache = {}
    }

    async get(url, options={}){
        const cacheKey = JSON.stringify({url, options})
        const cacheRes = this.cache[cacheKey]
        if(cacheRes) {
            console.log('returning from cache')
            return cacheRes
        }

        const res = await axios.get(url, options)
        this.cache[cacheKey] = res.data
        return res.data
    }

    clearCache() {
        this.cache = {}
    }
}

const httpClient = new Cache()

async function test() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    console.log('First Request:');
    const res1 = await httpClient.get(url);
    console.log('res1', res1)
    console.log('\nSecond Request (Cached):');
    const res2 = await httpClient.get(url); 
    console.log('res2', res2)
}

test()

