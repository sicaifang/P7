const { Service } = require('egg');

class NewsService extends Service {
    // eggjs里内置 一个方法 用来读取远程 接口数据 this.ctx.curl
    // result = {header, data}
    // congig属性是this的属性
    async fetch() {
        let { data } = await this.ctx.curl(this.config.news.url);
        data = data.toString();     // 将buffer转成字符串
        let news = [];
        let reg = /<a href="(\/s\?id=[^"]+)".+>([\s\S]+?)<\/a>/g;
        data.replace(reg, (matched, url, title) => {
            if (!title.includes('img') && !title.includes('查看详情')) {
                news.push({
                    title,  // todo 查看详情：还有小问题，自己解决
                    url: 'https://baijia.baidu.com' + url,
                    // time: moment(new Date()).fromNow(),
                    time: this.ctx.helper.relative(new Date())
                });
            }
        });
        return news;
    }
}

module.exports = NewsService;