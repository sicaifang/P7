module.exports = (options, app) => {
    return async function(ctx, next) {
       let userAgent = ctx.get('user-agent');  // 得到的就是请求头中的User-Agent
       let matched = options.use.some(item => item.test(userAgent));
       if (matched) {
           ctx.status = 403;    // forbidden
           ctx.body = '无权访问';
       } else {
           await next();
       }
    }
}