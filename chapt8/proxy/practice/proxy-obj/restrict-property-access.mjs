const target = { name: "John", secret: "hidden" };

const proxy = new Proxy(target, {
    get(target, prop, ) {
        if (prop === "secret") {
            return "access denied to secret"
        }
        return typeof target[prop] === "string" ? target[prop].toUpperCase() : target[prop]; 
    },
    has(target, prop) {
        return prop !== "secret" && prop in target;
    },
    set(target, prop, value) {
        if(prop === "secret") {
            return ("Access denied to secret");
        }
        target[prop] = value
        return true
    }
})

console.log("name" in proxy); // true
console.log("secret" in proxy); // false
console.log(proxy.name); // "JOHN"
proxy.age = 25;
console.log(proxy.age); // 25
console.log(proxy.secret); // Access denied
proxy.name = "BOB" // "BOB"
console.log(proxy.secret = "new value"); // Access denied

console.log(target)