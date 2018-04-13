let babel = require('babel-core');      // babel核心库，用来实现核心的转换引擎
let types = require('babel-types');     // 可以实现类型判断，生成AST节点
let code = `let sum = (a,b) => a+b`;

// 这个访问者可以对特定类型的节点进行处理
let visitor = {
    ArrowFunctionExpression(path) {
        let params = path.node.params;
        let blockStatement = types.blockStatement([
            types.returnStatement(path.node.body)
        ]);
        let func = types.functionExpression(null, params, blockStatement, false, false);
        path.replaceWith(func);
    }
};

let arrowPlugin = {visitor};
// babel内部先把代码转成AST,然后进行遍历
let result = babel.transform(code, {
    plugins: [
        arrowPlugin
    ]
});
console.log(result.code);