async function customPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        const promiseArr = [...promises]
        if(promiseArr.length === 0){
            return resolve([])
        }
        let completed = 0
        let hasErr = false
        const results = new Array(promiseArr.length);
        const errors = new Array(promiseArr.length);

        promiseArr.forEach((promise, index) => {
            Promise.resolve(promise)
            .then(val => {
                results[index] = val
                
            })
            .catch(err => {
                console.log(err)
                hasErr = true
                errors[index] = err
            }).finally(() => {
                completed++
                if(completed === promiseArr.length){
                    hasErr? reject(errors.filter(err => err !== undefined)) : resolve(results)
                }
            })
        })
    })
}