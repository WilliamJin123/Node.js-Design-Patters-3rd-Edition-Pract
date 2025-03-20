// 8.2 Timestamped logs: Create a proxy for the console object that enhances
// every logging function (log(), error(), debug(), and info()) by prepending
// the current timestamp to the message you want to print in the logs. For
// instance, executing consoleProxy.log('hello') should print something like
// 2020-02-18T15:59:30.699Z hello in the console.


const consoleProxy = new Proxy(console, {
    get(target, prop, receiver) {
        if(prop === 'log' || prop === 'error' || prop === 'debug' || prop === 'info') {
            return (...args) => {
                target[prop](`${new Date().toISOString()}`, ...args)
            }
        }
        return target[prop]
    }
})

consoleProxy.log("Hello, world!");
consoleProxy.error("An error occurred!");
consoleProxy.debug("Debugging info");
consoleProxy.info("Some useful info");