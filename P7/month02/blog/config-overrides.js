const {injectBabelPlugin} = require('react-app-rewired');


module.exports = function (config, env) {
    // 执行对config的修改
    config = injectBabelPlugin(['import', {
        libraryName: 'antd'
    }])
    return config;
}