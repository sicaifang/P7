'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 用户
  router.post('/api/user/signup', controller.user.signup);
  router.post('/api/user/signin', controller.user.signin);
  router.post('/api/user/signout', controller.user.signout);

  router.resources('categories', '/api/categories', controller.categories);

  router.resources('articles', '/api/articles', controller.articles);

  router.get('/api/articles/pv/:id', controller.articles.addPv);
  router.post('/api/articles/comment/:id', controller.articles.addComment);
};
