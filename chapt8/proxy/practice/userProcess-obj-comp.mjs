class UserProcessor {
    process(username) {
        return `User ${username} has been processed.`;
    }
}

class UserProcessorProxy {
    constructor(userProcessor){
        this.userProcessor = userProcessor
    }
    process(username) {
        if(typeof username !== 'string' || username.length < 3 ){
            return 'Username must be a string of 3 or more characteres'
        }
        return this.userProcessor.process(username);
    }
}
const userProcessor = new UserProcessorProxy(new UserProcessor());
console.log(userProcessor.process("Alice")); // Valid input
console.log(userProcessor.process("A"));     // Invalid input (error)

function AuthProcessorProxy (userProcessor) {
    return {
        process: function (username) {
            if(username !== 'admin'){
                return ('Only admin can access this resource')
            }
            return userProcessor.process(username)
        }
    }
}

const authProcessor = AuthProcessorProxy(userProcessor);
console.log(authProcessor.process("Alice")); // Invalid input (error)
console.log(authProcessor.process("admin")); // Valid input