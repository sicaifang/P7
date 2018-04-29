#! /usr/bin/env node
// 这个文件就要描述如何打包
let entry = './src/index.js';   // 入口文件
let output = './dist/main.js';  //出口文件
let fs = require('fs');
let script = fs.readFileSync(entry, 'utf8');

let ejs = require('ejs');
// let name = 'nba';
// console.log(ejs.render('<a><%=name%></a>', {name})); // =转义 -不转义


let template = `
(function (modules) {
    function require(moduleId) {    // moduleId代表的就是文件名
        var module = installedModules[moduleId] = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, require);
        return module.exports;
    }
    return require("<%-entry%>");
})
({
    "<%-entry%>":
        (function (module, exports) {
            eval(\`<%-script%>\`);
        })
});
`;
// result为替换后的结果，最终要写到output中
let result = ejs.render(template, {
    entry,
    script
});
fs.writeFileSync(output, result);
console.log('编译成功');

// 目前单个文件打包编译可以了，主要就是替换的功能