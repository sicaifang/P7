const Controller = require('egg').Controller;

class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }
  async get Pager(modeName, fields) {
    const { ctx } = this;
    let { pageNum, pageSize, keyword = '' } = ctx.query;
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    pageSize = isNaN(pageSize) ? 5 : parseInt(pageSize);
    let query = {};
    if (keyword && fields.length > 0) {
      query['$or'] = fields.map(field => ({ [field]: new RegExp(keyword) }))
    }
    let total = await ctx.model[modeName].count(query);
    let items = await ctx.model[modeName].find(query)
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);

    this.success({
      items,
      pageNum,
      pageSize,
      total,
      pageCount: (Math.ceil(total / pageSize))
    })
  }
  success(data) {
    ctx.body = {
      code: 0,
      data
    }
  }
  error(err) {
    console.error(err);
    ctx.body = {
      code: 1,
      err
    }
  }
}

module.exports = BaseController;
