const moment = require('moment');
moment.locale('zh-cn');

// 添加扩展工具方法
exports.relative = function(time) {
    return moment(time).fromNow();
}