// 执行上下文栈   作用域

function one() {
    var a = 1;
    two();
    function two() {
        var b = 2;
        three();
        function three() {
            console.log(b);
        }
    }
}

one();