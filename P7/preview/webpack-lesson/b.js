const fs = require('fs');
// CommonJS简单实现
function req(pathName) {
    // content代表的是文件内容
    let content = fs.readFileSync(pathName, 'utf8');
    // 最后一个参数是函数的内容体
    let fn = new Function('exports', 'require', 'module', '__filename', '__dirname', content+'\n return module.exports');
    let module = {
        exports: {

        }
    };
    // 函数执行就可以取到module.exports的值了
    return fn(module.exports, module, req, __dirname, __filename);
}

const str = req('./a.js');


console.log(str);
/*
*   function (exports, require, module, __filename, __dirname) {
*       module.exports = '刚好遇见你';
*       return module.exports;
*   }
* */