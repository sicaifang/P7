#! /usr/bin/env node    
// 写上面这句话是告诉文件是在node下执行，不然会报错无法编译
let entry = './src/index.js';   // 入口文件
let output = './dist/main.js'   // 出口文件
let fs = require('fs');
let path = require('path');
let script = fs.readFileSync(entry, 'utf8');
let results = [];
// + loader其实就是函数
// 这里写一个style-loader
let styleLoader = function(source) {   // 负责将结果进行更改 更改后继续走
    // src就是样式中的内容
    return `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source).replace(/(\\r)?\\n/g, '')};
        document.head.appendChild(style);  
    `;
};

// 如果有require引用的依赖，那就需要替换处理依赖
script = script.replace(/require\(['"](.+?)['"]\)/g, function() {
    let name = path.join('./src/',  arguments[1]);     // ./src/a.js
    let content = fs.readFileSync(name, 'utf8');
    
    if (/\.css$/.test(name)) {
        content = styleLoader(content);
    }

    results.push({
        name,
        content
    });
    return `require('${name}')`;    // require('./src/a.js')
});


// 用ejs可以实现内容的替换
let ejs = require('ejs');


let template = `
    (function (modules) {
    function require(moduleId) {
        var module = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, require);
        return module.exports;
    }
    return require("<%-entry%>");
})
    ({
        "<%-entry%>": (function (module, exports, require) {
            eval(\`<%-script%>\`);
        })
        <%for(let i=0;i<results.length;i++){
            let mod = results[i];%>,
            "<%-mod.name%>": (function (module, exports, require) {
                eval(\`<%-mod.content%>\`);
            })
        <%}%>
    });
`;

// result为替换后的结果，最终要写到output中
let result = ejs.render(template, {
    entry,
    script,
    results
});

try {
    fs.writeFileSync(output, result);
} catch(e) {
    console.log('编译失败', e);
}
console.log('编译成功');