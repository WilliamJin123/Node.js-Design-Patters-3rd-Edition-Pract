
// encapsulation with factory

function createPerson(name){
    const privateProps = {}

    const person = {
        setName(name) {
            if(!name){
                throw new Error('person must have a name')
            }
            privateProps.name = name
        },
        getName(){
            return privateProps.name
        }
    }

    person.setName(name)
    return person
}


// private attributes

class Person {
    #name
    constructor(name){
        this.#name = name
    }
    setName(name){
        this.#name = name
    }
    getName(){
        console.log(this.#name)
    }
}


const bob = new Person('bob')
bob.getName()

bob.setName('bill')
bob.getName()
// console.log(bob.name)