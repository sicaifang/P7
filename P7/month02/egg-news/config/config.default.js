exports.keys = 'egg-study';     // 用来加密cookie的，防止修改cookie

exports.view = {
    defaultViewEngine: 'ejs',   // 默认的渲染引擎
    mapping: {                  // 设置针对什么类型的文件用什么模板引擎来渲染
        '.ejs': 'ejs',          // 如果渲染的是.ejs模板文件的话，就用ejs模板引擎来渲染
    }
}

exports.news = {
    url: 'https://baijia.baidu.com'
}

// 只有在此处配置的中间件才会起作用
exports.middleware = [
    'time',
    'ua'
]
exports.time = {
    prefix: '本次请求一共花了 '
}
exports.ua = {
    // use: [/Chrome/, /Firefox/]
    use: []
}