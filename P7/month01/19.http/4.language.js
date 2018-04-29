// 多语言 vue-i18n 国际化
// 可以支持语言的切换

// 服务端如何支持多语言
let pack = {
    'zh-CN': {
        content: '你好'
    },
    'en': {
        content: 'hello'
    },
    'fr-FR': {
        content: 'Bonjour'
    }
};
let http = require('http');

http.createServer(function (req, res) {
    let defaultLang = 'en';
    let lang = req.headers['accept-language'];
    // Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
    let arr = [];
    if (lang) {
        arr = lang.split(',').map(l => {
            l = l.split(';');
            return {
                name: l[0],
                q: l[1] ? parseFloat(l[1].split('=')[1]) : 1
            }
        }).sort((a, b) => b.q - a.q);
    }
    console.log(arr);
    res.setHeader('Content-Type', 'text/plain;charset=utf8');
    for (let i = 0; i < arr.length; i++) {
        // 去语言包里找对应的内容 看看有没有
        let name = arr[i].name;
        if (pack[name]) {
            res.end(pack[name].content);
            break;
        }
    }

    res.end(pack[defaultLang].content);
}).listen(9000);