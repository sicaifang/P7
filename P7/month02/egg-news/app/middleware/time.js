module.exports = (options, app) => {
    return async function (ctx, next) { // ctx上下文  next执行下一层中间件
        const start = Date.now();
        await next();
        console.log(options.prefix + (Date.now() - start) + 'ms');
    }
}