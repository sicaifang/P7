// 1. ☆☆☆☆☆数组展平
// 数组最多为二维数组[[1,2],[3,4]] => [1,2,3,4]
function flattenOnce(arr) {
    return [].concat(...arr);
}
let arr = [[1, 2], [3, 4]];
let result = flattenOnce(arr);
console.log(result);

// 2. ★☆☆☆☆ 数组展平(递归)
let arr2 = [[1, 2], 3, [[[4], 5]]];
function flatten(arr) {
    return [].concat(
        ...arr.map(x => Array.isArray(x) ? flatten(x) : x)
    )
}
let result = flatten(arr2);
console.log(result);

// 3. ★☆☆☆☆函数节流
// document.addEventListener('scroll', throttle(console.log('scroll')));
function throttle(func, delay = 60) {
    let lock = false;
    return (...args) => {
        if (lock) return;
        func(...args);
        lock = true;
        setTimeout(() => { lock = false }, delay);
    }
}

// 4. ★☆☆☆☆函数节流(另一种)
// 过滤掉重复的验证事件(用户输入停止后300ms触发验证)
function throttle(func, delay = 300, timer = null) {
    return (...args) => {
        clearInterval(timer);
        timer = setTimeout((...args) => func(...args), delay);
    }
}

// 5. ★★☆☆☆柯里化
/*
    对于curry(foo),g函数参数满足4个，就调用foo(a,b,c,d)
    如果小于4个就返回一个可以继续积累参数的函数
*/
function curry(fn) {
    const g = (...allArgs) => allArgs.length >= fn.length ?
        fn(...allArgs) : 
        (...args) => g(...allArgs, ...args)

    return g;
}

// 测试用例
const foo = curry((a, b, c, d) => {
    console.log(a, b, c, d);
});
foo(1)(2)(3)(4);
const f = foo(1)(2)(3);
f(5);

// 6. ★★★☆☆ Y-组合子
const curryY = func => y(
    g => {
        (...allArgs) => {
            allArgs.length >= func.length ?
                func(...allArgs) :
                (...args) => g(...allArgs, ...args)
        }
    }
);

const foo = curryY((a, b, c, d) => {
    console.log(a, b, c, d);
});
foo(1)(2)(3)(4);

// 7. ★★★★☆ 树的编辑距离(DOM-DIFF)