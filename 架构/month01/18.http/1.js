let url = require('url');
let u = 'https://m.so.com/s?q=%E4%BD%93%E8%82%B2%E6%96%B0%E9%97%BB&src=suggest_history&sug_pos=0&sug=&srcg=home_next';

// curl -v -d name="chd" http://localhost:8080
// -d 写数据 后面跟数据

let urlObj = url.parse(u, true);
