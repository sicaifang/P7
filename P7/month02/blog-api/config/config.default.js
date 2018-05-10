'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525494214308_592';

  // add your config here
  config.middleware = [];

  // 配置mongoose
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/blogData'
    }
  }

  config.security = {
    csrf: false
  }

  return config;
};
