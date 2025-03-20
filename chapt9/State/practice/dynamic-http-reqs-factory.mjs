import * as http from 'http'
//factory
function requestHandlerFactory(type){
    switch(type){
        case 'log':
            return (req, res) => {
                console.log("Logging request...");
                res.end("Request logged.");
            }
        case 'auth':
            return (req, res) => {
                res.end("Authentication successful.");
            };
        case 'data':
            return (req, res) => {
                res.end('Database accessed.')
            }
        default:
            return (req, res) => {
                res.end('Invalid Req Type')
            }
    }
}


