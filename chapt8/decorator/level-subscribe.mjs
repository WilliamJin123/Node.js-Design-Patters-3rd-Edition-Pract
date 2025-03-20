export function levelSubscribe(db) {
    db.subscribe = (pattern, listener) => {
        db.on('put', (key, val) => {
            const match = Object.keys(pattern).every(key => pattern[key] === val[key]);
            if (match) {
                listener(key, val)
            }
        })

    }
    return db
}