class Subject {
    observers = [];
    attach(observer) {
        this.observers.push(observer);
    }
    detach(observer) {
        this.observers = this.observers.filter(o => o !== observer);
    }
    notify(data){
        this.observers.forEach(observer => observer.update(data))
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    update(data) {
        console.log(`${this.name} received ${data}`)
    }
}


const temperatureSensor = new Subject();
const display1 = new Observer("Display 1");
const display2 = new Observer("Display 2");

temperatureSensor.attach(display1);
temperatureSensor.attach(display2);

temperatureSensor.notify("Temperature: 25°C");

temperatureSensor.detach(display1);
temperatureSensor.notify("Temperature: 30°C");