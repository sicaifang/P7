// 异步的发展
// node 支持异步
// callback -> promise -> generator + co -> async+await(语法糖)

let fs = require('fs');
// 异步不支持try/catch, try/catch只支持同步
// 异步不能return
fs.readFile('1.txt', 'utf8', function (err, data) {
    fs.readFile(data, 'utf8', function (err, data) {
        console.log(data);
    });
});


// 高阶函数
// 函数可以作为参数or函数作为返回值

// 判断数据类型  isType
// function isType(type, value) {
//     return Object.prototype.toString.call(value) === `[object ${type}]`;
// }
// 1) 批量生产函数
function isType(type) {     // 偏函数  先预置进去
    return function (value) {
        return Object.prototype.toString.call(value) === `[object ${type}]`;
    }
}

const isString = isType('String');
const isArray = isType(Array);
console.log(isArray([222]));


// 2) 预置函数  after
/*function after(times, cb) {
    return function () {
        if (--times === 0) {
            cb();
        }
    }
}

let eat = after(3, function () {
    console.log('吃饱了');
});
eat();
eat();
eat();*/


let arr = [];

// 不确定要读取几个文件，每次都要修改个数不好
/*function out(data) {
    arr.push(data);

    if (arr.length === 2) {
        console.log(arr);
    }
}*/

// 可以缓存函数，当达到条件时执行
function after(times, cb) {
    let res = [];
    return function (data) {
        res.push(data);

        if (--times === 0) {
            cb(res);
        }
    }
}

let out = after(4, function (arr) {
    console.log(arr);
});

fs.readFile('1.txt', 'utf8', function (err, data) {
    out(data);
});
fs.readFile('2.txt', 'utf8', function (err, data) {
    out(data);
});
fs.readFile('2.txt', 'utf8', function (err, data) {
    out(data);
});
fs.readFile('1.txt', 'utf8', function (err, data) {
    out(data);
});