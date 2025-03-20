class APIService {
    request(endpoint) {
        console.log(`Fetching data from ${endpoint}...`);
    }
}

function createLoggingProxy(service){
    return new Proxy(service, {
        get(target, prop, receiver){
            if(typeof target[prop] === 'function'){
                return function(...args){
                    console.log(`Calling ${prop} with args ${args}`);
                    return target[prop](...args)
                }
            }
            return true
        }
    })
}

const api = new APIService();
const loggedApi = createLoggingProxy(api);

loggedApi.request("/users");