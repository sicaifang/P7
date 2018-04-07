(function (modules) {
    function require(moduleId) {    // moduleId代表的就是文件名
        var module = installedModules[moduleId] = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, require);
        return module.exports;
    }
    return require("./src/index.js");
})
({
    "./src/index.js":
        (function (module, exports) {
            eval("// let str = require('./a.js');\n\n// console.log(str);\n\nconsole.log('欢迎使用webpack4');\n\n//# sourceURL=webpack:///./src/index.js?");
        })
});