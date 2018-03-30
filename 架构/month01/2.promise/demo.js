function Promise(executor) {
    const self = this;
    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;
    self.onFulfilledCb = [];
    self.onRejectedCb = [];

    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'fulfilled';
            self.value = value;
            self.onFulfilledCb.forEach(function (fn) {
                fn();
            });
        }
    }

    function reject(reason) {
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

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('循环引用'));
    }
    let called;     // 表示是否调用成功or失败
    // x返回的可能是对象和函数也可能是一个普通的值
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, function (y) {
                    // 防止多次调用
                    if (called) return;
                    called = true;
                    // y可能还是个promise，所以递归继续解析只到返回一个普通值
                    resolvePromise(promise2, y, resolve, reject);
                }, function (e) {
                    if (called) return;
                    called = true;
                    reject(e);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);     // 返回一个普通值
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
        return value;
    };
    onRejected = typeof onRejected === 'function' ? onRejected : function (err) {
        throw err;
    };
    const self = this;
    let promise2;

    if (self.status === 'fulfilled') {
        // 当成功或失败执行时，有异常那么返回的promise应该处于失败态
        promise2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
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
            });
        });
    }
    // 当调用then时 可能没成功也没失败，就处于pending状态
    if (self.status === 'pending') {
        // 将成功的回调添加到数组中
        promise2 = new Promise(function (resolve, reject) {
            self.onFulfilledCb.push(function () {
                setTimeout(function () {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                });
            });

            self.onRejectedCb.push(function () {
                setTimeout(function () {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                });
            });
        });
    }

    return promise2;
};

// 捕获错误的方法
Promise.prototype.catch = function (callback) {
    return this.then(null, callback);
};

// 类身上的方法
// all
Promise.all = function (all) {
    return new Promise(function (resolve, reject) {
        let res = [];
        let num = 0;
        len = all.length;
        for (let i = 0; i < len; i++) {
            all[i].then(function (data) {
                res[i] = data;
                if (++num === len) {
                    resolve(res);
                }
            }, reject);
        }
    });
};
// race
Promise.race = function (items) {
    return new Promise(function (resolve, reject) {
        for (let i = 0; i < items.length; i++) {
            items[i].then(resolve, reject);
        }
    });
};
// resolve
Promise.resolve = function (value) {
    return new Promise(function (resolve, reject) {
        resolve(value);
    });
};
// reject
Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
        reject(reason);
    });
};

// promises-aplus-test测试库要求写一个defer
Promise.defer = Promise.deferred = function () {
    let def = [];
    def.promise = new Promise(function (resolve, reject) {
        def.resolve = resolve;
        def.reject = reject;
    });

    return def;
};


module.exports = Promise;