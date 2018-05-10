import { createCipher } from 'crypto';

let BaseController = require('./base');

module.exports = class ArticlesController extends BaseController {
    // 获取文章
    async index() {
        try {
            await this.Pager('Article', ['title', 'content']);
        } catch (e) {
            this.error(e);
        }
    }

    // 创建文章
    async create() {
        const { ctx } = this;
        let article = ctx.request.body;
        article.user = this.user;
        try {
            article = await ctx.model.Article.create(article);
            this.success('文章发表成功');
        } catch (e) {
            this.error(e);
        }
    }

    // 修改文章
    async update() {
        const { ctx } = this;
        let id = ctx.params.id;
        let article = ctx.request.body;

        try {
            await ctx.model.Article.findByIdAndUpdate(id, article);
            this.success('文章更新成功');
        } catch (e) {
            this.error(e);
        }
    }

    // 删除文章
    async destory() {
        const { ctx } = this;
        let id = ctx.params.id;

        try {
            await ctx.model.Article.findByIdAndRemove(id);
            this.success('删除文章成功');
        } catch (e) {
            this.error(e)
        }
    }

    // 增加pv
    async addPv() {
        const { ctx } = this;
        let id = ctx.params.id;
        try {
            await ctx.model.Article.findByIdAndUpdate(id, { $inc: { pv: 1 } });
            this.success('添加PV');
        } catch (e) {
            this.error(e);
        }
    }

    // 增加评论
    async addComment() {
        const { ctx } = this;
        let id = ctx.params.id;
        let comment = ctx.request.body;
        comment.user = this.user;
        try {
            await ctx.model.Article.findByIdAndUpdate(id, { $push: { comments: comment } });
            this.success('评论成功');
        } catch (e) {
            this.error(e);
        }
    }
}