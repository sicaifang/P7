const fs = require('fs');
const path = require('path');
// CommonJS简单实现
function req(pathName) {
    // content代表的是文件内容
    let content = fs.readFileSync(path.join(__dirname,pathName), 'utf8');
    console.log(content);
    // 最后一个参数是函数的内容体
    let fn = new Function('exports', 'require', 'module', '__filename', '__dirname', content+'\n return module.exports');
    let module = {
        exports: {}
    };
    // 函数执行就可以取到module.exports的值了
    let result = fn(module.exports, module, req, __dirname, __filename);
    // console.log(result);
    // function demoFn() {
    //     module.exports = '刚好遇见你';
    //     return module.exports;
    // }
    return result;
}

const str = req('./a.js');
console.log(str);
/*
*   function (exports, require, module, __filename, __dirname) {
*       module.exports = '刚好遇见你';
*       return module.exports;
*   }
* */