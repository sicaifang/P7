let Koa = require('koa');
let app = new Koa();

app.listen(3000);

app.use((ctx, next) => {
    ctx.body = 'hello';
});