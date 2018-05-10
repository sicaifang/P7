let BaseController = require('./base');

module.exports = class CategoriesController extends BaseController {
    async index() {
        try {
            let items = await this.Pager('Category', ['name']);
            this.success({ items });
        } catch (e) {
            this.error(e);
        }
    }

    // 增加文章分类
    async create() {
        let { ctx } = this;
        let category = ctx.request.body;
        try {
            let doc = await ctx.model.Category.findOne(category);
            if (doc) {
                this.error('此分类已经存在');
            } else {
                doc = await ctx.model.Category.create(category);
                this.success('保存分类成功');
            }
        } catch (e) {
            this.error(e);
        }
    }


    // 更新文章分类
    async update() {
        let { ctx } = this;
        let category = ctx.request.body;
        let id = ctx.params.id;

        try {
            let result = await ctx.model.Category.findByAndUpdate(id, category);
            this.success('更新成功');
        } catch (e) {
            this.error(e);
        }
    }

    // 删除文章分类
    async destory() {
        let {ctx} = this;
        let id = ctx.params.id;

        try {
            await ctx.model.Category.findByAndRemove(id);
            this.success('删除成功');
        } catch(e) {
            this.error(e);
        }
    }
}