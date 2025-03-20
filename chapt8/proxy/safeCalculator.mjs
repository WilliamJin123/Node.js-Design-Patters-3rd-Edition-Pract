import { StackCalculator } from "./stackCalculator.mjs"

class SafeCalculator {
    constructor(calculator) {
        this.calculator = calculator
    }
    // proxied method
    divide() {
        // additional validation logic
        const divisor = this.calculator.peekValue()
        if (divisor === 0) {
            throw Error('Division by 0')
        }
        // if valid delegates to the subject
        return this.calculator.divide()
    }
    // delegated methods
    putValue(value) {
        return this.calculator.putValue(value)
    }
    getValue() {
        return this.calculator.getValue()
    }
    peekValue() {
        return this.calculator.peekValue()
    }
    clear() {
        return this.calculator.clear()
    }
    multiply() {
        return this.calculator.multiply()
    }
}
const calculator = new StackCalculator()
const safeCalculator = new SafeCalculator(calculator)
calculator.putValue(3)
calculator.putValue(2)
console.log(calculator.multiply()) // 3*2 = 6
safeCalculator.putValue(2)
console.log(safeCalculator.multiply()) // 6*2 = 12
calculator.putValue(0)
console.log(calculator.divide()) // 12/0 = Infinity
safeCalculator.clear()
safeCalculator.putValue(4)
safeCalculator.putValue(0)
console.log(safeCalculator.divide()) // 4/0 -> Error