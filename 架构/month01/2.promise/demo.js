function Promise(executor) {
    const self = this;
    self.status = 'pending';
    self.reason = null;
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

}

Promise.prototype.then = function (onFulfilled, onRejected) {
    const self = this;
    if (self.status === 'fulfilled') {
        onFulfilled(self.value);
    }
    if (self.status === 'rejected') {
        onRejected(self.reason);
    }
    // 当调用then时 可能没成功也没失败，就处于pending状态
    if (self.status === 'pending') {
        // 将成功的回调添加到数组中
        self.onFulfilledCb.push(function () {
            onFulfilled(self.value);
        });
        self.onRejectedCb.push(function () {
            onRejected(self.reason);
        });
    }
};