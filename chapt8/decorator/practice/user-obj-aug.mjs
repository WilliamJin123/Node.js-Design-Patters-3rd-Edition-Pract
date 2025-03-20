// Create a decorator function that augments a User object with admin privileges. The decorator should add a method deleteAccount() that only admins can use.

class User {
    constructor(name) {
        this.name = name;
    }

    login() {
        console.log(`${this.name} logged in.`);
    }
}

class AdminDecorator {
    constructor(user) {
        this.user = user

    }
    deleteAccount() {
        console.log(this.user.name + ' deleted an account')

    }
    login() {
        return this.user.login()
    }
}

//or 

function AdminDecoratorPatch(user) {
    user.isAdmin = true
    user.deleteAccount = function () {
        console.log(this.name + ' deleted an account')
    }
    return user;
}

const normalUser = new User("Alice");
normalUser.login();

const adminUser = new AdminDecorator(new User("Bob"));
adminUser.login();
adminUser.deleteAccount();

const adminUser2 = AdminDecoratorPatch(new User("Charlie"));
adminUser2.login();
adminUser2.deleteAccount();


