class Database {
    constructor(dbName, connectionDetails) {

    }

}


export const dbInstance = new Database(Database('my-app-db', {
    url: 'localhost:5432',
    username: 'user',
    password: 'password'}))

//not true singleton, use global variable global.dbInstance
