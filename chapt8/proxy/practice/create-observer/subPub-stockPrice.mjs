class PubSub {
    constructor() {
        this.events = []
    }
    subscribe(event, listener) {
        if(!this.events[event]){
            this.events[event] = []
        }
        this.events[event].push(listener)
    }
    unsubscribe(event, listener) {
        this.events[event] = this.events[event]?.filter(l => l !== listener)
    }
    publish(event, data){
        this.events[event]?.forEach(listener => listener(data))
    }
}

const pubSub = new PubSub();

const investor1 = (price) => console.log(`Investor 1 notified: New price is $${price}`);
const investor2 = (price) => console.log(`Investor 2 notified: New price is $${price}`);

pubSub.subscribe('stockPrice', investor1);
pubSub.subscribe('stockPrice', investor2);

// StockMarket acts as a publisher
const stockMarket = {
    updatePrice: (price) => pubSub.publish('stockPrice', price)
};

stockMarket.updatePrice(200);
stockMarket.updatePrice(205);

pubSub.unsubscribe('stockPrice', investor1);
stockMarket.updatePrice(210);