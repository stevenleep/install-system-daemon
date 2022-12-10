// 将函数包装为Promise
function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
            })
        })
    }
}

exports.promisify = promisify;