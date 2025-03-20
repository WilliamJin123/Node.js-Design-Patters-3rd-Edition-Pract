import * as http from 'http'

class ActiveState{
    handleRequest(req, res){
        res.end("Server is Active. Handling request normally.")
    }
}

class MaintenanceState{
    handleRequest(req, res) {
        res.end("Server is under Maintenance. Try again later.");
    }
}

class OfflineState{
    handleRequest(req, res) {
        res.end("Server is Offline. Service unavailable.");
    }

}

class ServerContext{
    constructor(){
        this.state = new ActiveState()

    }

    setState(state)
    {
        this.state = state;
    }
    handleRequest(req, res) {
        this.state.handleRequest(req, res);
    }
}


const serverContext = new ServerContext();

// HTTP Server
const server = http.createServer((req, res) => {
    if (req.url.startsWith("/state/")) {
        const newState = req.url.split("/")[2];

        switch (newState) {
            case "active":
                serverContext.setState(new ActiveState());
                res.end("Server state changed to Active.");
                break;
            case "maintenance":
                serverContext.setState(new MaintenanceState());
                res.end("Server state changed to Maintenance.");
                break;
            case "offline":
                serverContext.setState(new OfflineState());
                res.end("Server state changed to Offline.");
                break;
            default:
                res.end("Invalid state.");
        }
    } else {
        serverContext.handleRequest(req, res);
    }
});

// Start the server
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});