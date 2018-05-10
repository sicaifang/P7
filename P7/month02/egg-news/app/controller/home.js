const { Controller} = require('egg');

class HomeController extends Controller {
    async index() { // async 异步
        this.ctx.body = 'hello world';
    }
}

module.exports = HomeController;