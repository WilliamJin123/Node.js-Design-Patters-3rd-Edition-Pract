// 8.5 The lazy buffer: Can you implement createLazyBuffer(size), a factory
// function that generates a virtual proxy for a Buffer of the given size? The
// proxy instance should instantiate a Buffer object (effectively allocating
// the given amount of memory) only when write() is being invoked for the
// first time. If no attempt to write into the buffer is made, no Buffer instance
// should be created.

function createLazyBuffer(size){
    let buffer = null
    return new Proxy({},{
        get(target, prop, receiver){
            if(prop === 'write'){
                return (offset, data) => {
                    if(!buffer){
                        buffer = Buffer.alloc(size)
                    }
                    buffer.write(data)
                }
            } else if(prop === 'read'){
                return (offset, length) => {
                    if(buffer){
                        return buffer.toString('utf-8', offset, offset+length)
                    } else {
                        return null
                    }
                }
            }
            return Reflect.get(target, prop, receiver)
        }
    })
}

const lazyBuffer = createLazyBuffer(1024);
lazyBuffer.write(0, "Hello, world!"); // Buffer is created lazily
console.log(lazyBuffer.read(7, 13));
console.log(lazyBuffer.read(0, 7));