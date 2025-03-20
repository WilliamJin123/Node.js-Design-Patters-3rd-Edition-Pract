class readWrite {
    data = 8;
    data2 = 8;
    write1(data){
        this.data = data;
    }
    write2(data){
        this.data2 = data;
    }
    read1(){
        return this.data;
    }
    read2(){
        return this.data2;
    }
}

const preventWr = new Proxy(new readWrite(), {
    get: (target, property) => () => console.log(`Preventing read request from ${property}`),
    set: (target, property, value) => () => console.log(`Preventing write request from ${property} to change to ${value}`)
})

preventWr.write1(5);
preventWr.write2(10);
preventWr.read1()
preventWr.read2()