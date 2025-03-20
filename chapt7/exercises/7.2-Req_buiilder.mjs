import http from 'http';

class ReqBuilder{
    withUrl(url){
        this.url = url;
        return this;
    }
    withAgent(agent){
        this.agent = agent;
        return this;
    }
    withAuth(auth){
        this.auth = auth;
        return this
    }
    withConnection(createConnection){
        this.createConnection = createConnection;
        return this;
    }
    withPorts(localPort, port){
        
        this.localPort = localPort;
        this.port = port;
        return this;
    }
    withHost(family, host, hostname){
        this.family = family;
        this.host = host;
        this.hostname = hostname;
        return this;
    }
    withHeaders(headers, uniqueHeaders, maxHeaderSize){
        this.headers = headers;
        this.uniqueHeaders = uniqueHeaders;
        if(maxHeaderSize){
            this.maxHeaderSize = maxHeaderSize;
        }
        return this;
    }
    withHints(hints){
        this.hints = hints;
        return this;
    }
    enableJoinDuplicateHeaders(){
        this.joinDuplicateHeaders = true;
        return this;
    }
    enableSetDefaultHeaders(){
        this.setDefaultHeaders = true;
        return this;
    }
    enableSetHost(){
        this.setHost = true;
        return this;
    }
    enableInsecureHTTPParser(){
        this.insecureHTTPParser = true;
        return this;
    }
    withAddress(localAddress){
        this.localAddress = localAddress;
        return this;
    }
    withCustomLookup(customLookup){
        this.lookup = customLookup;
        return this;
    }
    withRequest(method, path){
        this.method = method;
        this.path = path;
        return this;
    }
    withProtocol(protocol, defaultPort){
        this.defaultPort = defaultPort;
        this.protocol = protocol;
        return this
    }
    withSignal(signal){
        this.signal = signal;
        return this;
    }
    withSocketPath(socketPath){
        this.socketPath = socketPath;
        return this;
    }
    withTimeout(timeout){
        this.timeout = timeout
        return this
    }
    callback(callback){
        this.callback = callback;
        return this;
    }
    build(){
        const options = {
            agent: this.agent,
            auth: this.auth,
            createConnection: this.createConnection,
            localPort: this.localPort,
            port: this.port,
            family: this.family,
            host: this.host,
            hostname: this.hostname,
            headers: this.headers,
            uniqueHeaders: this.uniqueHeaders,
            maxHeaderSize: this.maxHeaderSize,
            hints: this.hints,
            joinDuplicateHeaders: this.joinDuplicateHeaders,
            setDefaultHeaders: this.setDefaultHeaders,
            setHost: this.setHost,
            insecureHTTPParser: this.insecureHTTPParser,
            localAddress: this.localAddress,
            lookup: this.lookup,
            method: this.method,
            protocol: this.protocol,
            defaultPort: this.defaultPort,
            signal: this.signal,
            socketPath: this.socketPath,
            timeout: this.timeout
        };
        Object.keys(options).forEach(key => {
            if (options[key] === undefined){
                delete options[key]
            }
        })
        return http.request(this.url, options, this.callback)
    }
}

