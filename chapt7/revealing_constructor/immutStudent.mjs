import {Student} from '../builder/builder.mjs'


export class ImmutStudent extends Student{
    constructor(object){
        super(object)
        Object.freeze(this)
    }
}