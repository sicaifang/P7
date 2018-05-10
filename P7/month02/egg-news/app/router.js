/* 
    egg.js 和 koa 关系
    egg.js是基于koa封装的一个上级框架(底层用koa实现)
    router 其实就是路由中间件的router实例，可以在它身上定义路由规则
    controller 控制器的容器
    get指的是Http的方法名
    
    1.controller = {}   空对象
    2.得到HomeController，然后创建它的实例 let home = new HomeController()
    3.controller.home = home;
*/
module.exports = app => {
    const { router, controller } = app;

    router.get('/', controller.home.index);
    router.get('/news', controller.news.index);
}