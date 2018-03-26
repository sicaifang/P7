function Promise(executor) {
    const self = this;
    self.status = 'pending';
    self.value = null;  // 默认成功的值
    self.reason = null; // 默认失败的原因
    self.onFulfilledCb = [];    // 存放then成功的回调
    self.onRejectedCb = [];     // 存放then失败的回调

    function resolve(value) {    // 成功状态
        if (self.status === 'pending') {
            self.status = 'fulfilled';
            self.value = value;
            self.onFulfilledCb.forEach(function (fn) {
                fn();
            });
        }
    }

    function reject(reason) {     // 失败状态
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.reason = reason;
            self.onRejectedCb.forEach(function (fn) {
                fn();
            });
        }
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

function resolvePromise(p2, x, resolve, reject) {
    // 有可能这里返回的x是别人的promise
    // 尽可能允许其他乱写
    if (p2 === x) {   // 这里应该报一个类型错误
        return reject(new TypeError('循环引用了'));
    }
    let called; // 表示十分调用过成功or失败
    // 看x是不是promise, promise是一个对象
    if (x !== null || typeof x === 'object' || typeof x === 'function') {
        // 可能是promise {},这个对象中是否有then方法
        // 如果有then就认为它是promise
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, function (y) {   // 成功
                    // 不能多次调用
                    if (called) return;
                    called = true;
                    // y可能还是一个promise，再去解析直到返回的是一个普通值
                    resolvePromise(p2, y, resolve, reject);
                }, function (err) {            // 失败
                    if (called) return;
                    called = true;
                    reject(err);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {    // 说明是一个普通值
        resolve(x);
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    // 如果成功or失败函数没传，那就用个默认的
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
        return value;
    };
    onRejected = typeof onRejected === 'function' ? onRejected : function (err) {
        throw err;
    };
    const self = this;
    let promise2;       // 返回的promise

    if (self.status === 'fulfilled') {
        promise2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    // x可能是个普通值，也可能是个promise
                    let x = onFulfilled(self.value);
                    // x可能是别人的promise，写一个方法统一处理
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            })
        });
    }
    if (self.status === 'rejected') {
        promise2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            })
        });
    }
    // 当调用then时可能没成功  也没失败
    if (self.status === 'pending') {
        promise2 = new Promise(function (resolve, reject) {
            // 此时没有resolve 也没有reject
            self.onFulfilledCb.push(function () {
                setTimeout(function () {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            });
            self.onRejectedCb.push(function () {
                setTimeout(function () {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            });
        });
    }

    return promise2;
};

// 捕获错误的方法
Promise.prototype.catch = function (callback) {
    return this.then(null, callback);
};
// 解析全部的方法
Promise.all = function (promises) {
    // promises是一个promise数组
    return new Promise(function (resolve, reject) {
        let arr = [];   // 最终返回值的结果
        let num = 0;    // 表示成功了多少次
        function processData(index, y) {
            arr[index] = y;
            if (++num === promises.length) {
                resolve(arr);
            }
        }
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(function (y) {
                processData(i, y)
            }, reject)
        }
    });
};

Promise.all = function(promises){
    let i = 0; // 用来计数有多少个promise执行成功
    let result = [];// 存放结果
    return new Promise(function(resolve,reject){
        promises.forEach(function(p,index){
            p.then(function(data){
                // 将结果和数组的索引对应起来
                result[index] = data;
                if(++i === promises.length){
                    // 当promise全部完成后调用all方法成功的回调
                    resolve(result)
                }
            },reject);
        });
    });
};

// 只要有一个promise成功了，就算成功；只要有一个promise失败了，就算失败
Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
        promises.forEach((p, index) => {
            p.then(resolve, reject);
        });
    });
};


Promise.resolve = function (value) {
    return new Promise(function (resolve, reject) {
        resolve(value);
    });
};

Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
        reject(reason);
    });
};

Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise(function (resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};

module.exports = Promise;