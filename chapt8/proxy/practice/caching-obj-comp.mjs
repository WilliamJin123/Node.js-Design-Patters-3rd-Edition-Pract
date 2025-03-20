class ExpensiveComputation {
    compute(n) {
        console.log(`Computing result for ${n}...`);
        return n * n;
    }
}

class CacheProxy {
    constructor(expensiveComputation) {
        this.expensiveComputation = expensiveComputation;
        this.cache = {};
    }
    compute(n) {
        if (this.cache[n] === undefined) {
            console.log(`Fetching result for ${n} from cache...`);
            this.cache[n] = this.expensiveComputation.compute(n);
        }
        return this.cache[n];
    }
}

const computation = new CacheProxy(new ExpensiveComputation());
console.log(computation.compute(5)); // Computed
console.log(computation.compute(5));