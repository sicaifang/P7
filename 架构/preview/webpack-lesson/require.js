
// 实现一下
let factories = {};
// 模块名，依赖，工厂函数
function define(name, depend, factory) {
    factory.depend = depend;    // 将依赖记到factory上
    factories[name] = factory;
}

function require(modules, callback) {
    let result = modules.map(function (mod) {    // mod -> song, singer
        let factory = factories[mod];
        let depend = factory.depend;    // ['song']
        let exports;
        // require(['song'], function(song, singer){})
        require(depend, function () {
            exports = factory.apply(null, arguments);
        });
        return exports;
    });
    callback.apply(null, result);
}


// require的用法
// define 声明模块 通过require使用一个模块

// 定义  第2个参数是依赖
/*
define('song', [], function () {
    return '听妈妈的话';
});

define('singer', [], function () {
    return '周杰伦';
});

// 引用
require(['song', 'singer'], function (song, singer) {
    console.log(song, singer);
});
*/

define('song', [], function () {
    return '听妈妈的话';
});

define('singer', ['song'], function (song) {    // 依赖了song
    return '周杰伦-' + song;
});

// 引用
require(['singer'], function (singer) {
    console.log(singer);
});
