
const target = {}

const proxy = new Proxy(target, {
    isExtensible(target) {
        return Object.isExtensible(target)
    },
    preventExtensions(target) {
        if (Object.isExtensible(target)) {
            Object.preventExtensions(target); 
        }
        return true;
    }
})

console.log(Object.isExtensible(proxy)); 
Object.preventExtensions(proxy);
console.log(Object.isExtensible(proxy)); 