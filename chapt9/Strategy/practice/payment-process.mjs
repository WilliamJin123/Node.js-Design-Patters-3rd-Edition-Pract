class PaymentStrategy {
    pay(amount) {
        throw new Error("Method not implemented.");
    }
}

class CreditCardPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Paid $${amount} using Credit Card.`);
    }
}

class PayPalPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Paid $${amount} using PayPal.`);
    }
}

class BitcoinPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Paid $${amount} using Bitcoin.`);
    }
}

class PaymentContext {
    constructor(strat) {
        this.strategy = strat
    }
    pay(amount) {
        this.strategy.pay(amount)
    }
    setStrategy(strat) {
        this.strategy = strat
    }
}


const payment = new PaymentContext(new CreditCardPayment());
payment.pay(100);

payment.setStrategy(new PayPalPayment());
payment.pay(200);

payment.setStrategy(new BitcoinPayment());
payment.pay(300);