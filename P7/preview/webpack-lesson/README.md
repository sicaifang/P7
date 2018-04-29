## 1. 模块化
模块化是指把一个复杂的系统分解到多个模块以方便编写。

### 1.1 命名空间
开发网页要通过命名空间的方式来组织代码
```
<script src="jquery.js">
```
- 命名空间冲突，两个库可能会使用同一个名称
- 无法合理的管理项目的依赖和版本
- 无法方便的控制依赖的加载顺序

### 1.2 CommonJS
CommonJS是一种使用广泛的`JavaScript`模范化管理，核心思想是通过`require`方法来同步地加载依赖的其他模块，通过module.exports导出需要暴露的接口

#### 1.2.1 用法
采用CommonJS导入及导出时的代码如下：
```
// 导入
const A = require('./a.js');
fn();

// 导出
module.exports = A.fn;
```

#### 1.2.2 原理
a.js
```
module.exports = '刚好遇见你';
```
b.js
```
const fs = require('fs');
// CommonJS简单实现
function req(pathName) {
    // content代表的是文件内容
    let content = fs.readFileSync(pathName, 'utf8');
    // 最后一个参数是函数的内容体
    let fn = new Function('exports', 'require', 'module', '__filename', '__dirname', content+'\n return module.exports');
    let module = {
        exports: {}
    };
    // 函数执行就可以取到module.exports的值了
    return fn(module.exports, module, req, __dirname, __filename);
}
const str = req('./a.js');
console.log(str);   // '刚好遇见你'
```

### 1.3 AMD
AMD也是一种JavaScript模块化规范，与CommonJS最大的不同在于它采用异步的方式去加载依赖的模块。
AMD规范主要是为了解决针对浏览器环境的模块化问题，最具代表性的实现是RequireJS

AMD的优点
- 可在不转换代码的情况下直接在浏览器里运行
- 可加载多个依赖
- 代码可运行在浏览器环境和Node环境中

AMD的缺点
- 


