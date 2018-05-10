const { Controller } = require('egg');

class NewsController extends Controller {
    // 一般来说控制器只会处理请求的参数和返回响应
    async index() {
        let { ctx } = this;
        // 后端渲染
        let news = await this.ctx.service.news.fetch();
        console.log(news);
        // ctx.body = 'news';
        await ctx.render('news.ejs', { news }); // 要记住await
    }
}

module.exports = NewsController;