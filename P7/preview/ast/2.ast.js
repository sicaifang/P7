    // npm i esprima estraverse escodegen -S
    let esprima = require('esprima');
    let estraverse = require('estraverse');
    let escodegen = require('escodegen');
    let code = 'function ast() {}';
    let ast = esprima.parse(code);
    estraverse.traverse(ast, {
        enter(node) {
            console.log('进入 '+node.type);
            if (node.type === 'Identifier') {
                node.name += '_enter';
            }
        },
        leave(node) {
            console.log('离开 '+node.type);
            if (node.type === 'Identifier') {
                node.name += '_leave';
            }
        }
    });
    let result = escodegen.generate(ast);
    console.log(result);   // code是重新生成后的代码