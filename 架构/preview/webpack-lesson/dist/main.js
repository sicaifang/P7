
(function (modules) {
    function require(moduleId) {
        var module = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, require);
        return module.exports;
    }
    return require("./src/index.js");
})
    ({
        "./src/index.js":
            (function (module, exports, require) {
                eval(`let str = require('src/a.js');
require('src/style.css');
console.log(str);`);
            })
            ,
                "src/a.js":
                (function (module, exports, require) {
                    eval(`module.exports = '刚好遇见你';`);
                })
            ,
                "src/style.css":
                (function (module, exports, require) {
                    eval(`
        let style = document.createElement('style');
        style.innerHTML = "* {    margin: 0;    padding: 0;}body {    background: #0cc;}";
        document.head.appendChild(style);  
    `);
                })
            
    });
