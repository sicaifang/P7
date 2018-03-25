const Promise = require('./Promise');

let p = new Promise(function (resolve, reject) {
    reject(9998);
});

/*
p.then(function (data) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            reject(110);
        }, 1010)
    });
}, function (err) {
    console.log(err);
}).then(function (data) {
    console.log('第二次： ' + data);
}, function (err) {
    console.log('第二次错： ' + err);
})*/


// 8.我们的代码可以在then中什么都不传
// promise中值的穿透
p.then().then().then(function (data) {
    console.log(data);  // 999
}, function (err) {
    console.log(err);
});



// 9.promise规范中要求，所有的onFulfilled和onRejected都需要异步执行



/*function read() {
    return new Promise(function (resolve, reject) {
        require('fs').readFile('./1.txt', 'utf8', function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
}*/

function read() {
    let defer = Promise.defer();
    require('fs').readFile('2.txt', 'utf8', function (err, data) {
        if (err) defer.reject(err);
        defer.resolve(data);
    });
    return defer.promise;
}

read().then(function (data) {
    console.log(data);
    return '好听' + data;
}).then(function (data) {
    console.log(data);
})



// 下载promise测试库，promises-aplus-tests
// npm i promises-aplus-tests -g
promise3 30分钟