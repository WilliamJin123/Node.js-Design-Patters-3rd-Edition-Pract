export class Student {
    grade;
    school;
    gpa;
    name;
    height;
    age;
    constructor(object){
        this.grade = object.grade
        this.school = object.school
        this.gpa  = object.gpa
        this.name = object.name
        this.height = object.height
        this.age = object.age
    }
}


export class StudentBuilder {
    withGrades(grade, school, gpa) {
        this.grade = grade
        this.school = school
        this.gpa = gpa
        return this
    }
    withInfo(name, height, age) {
        this.name = name
        this.height = height
        this.age = age
        return this
    }
    build() {
        return new Student({
            grade: this.grade,
            school: this.school,
            gpa: this.gpa,
            name: this.name,
            height: this.height,
            age: this.age
        })

    }

}

const Bob = new StudentBuilder()
    .withGrades(9, "GVH", 4.0)
    .withInfo("Bob", 1.8, 15)
    .build()

console.log(Bob)