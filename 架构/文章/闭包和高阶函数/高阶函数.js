// 回调函数
// 异步请求
let getInfo = function (callback) {
    $.ajax({
        url: 'https://api.douban.com/v2/music/search',  // 以豆瓣音乐为例
        data: {
            q: '周杰伦',
            count: 10
        },
        dataType: 'jsonp',
        success: function (res) {
            callback && callback(res.musics);
        }
    })
};

getInfo(getData);

function getData(data) {
    if (data && data.length) {
        // todo
        // console.log(data);  // 得到的数据
        let html = render(data);

        initDom(html);
    }
}

let initDom = function(tmp) {
    let box = document.getElementById('box');
    box.innerHTML = tmp;
}

let render = function (data) {
    let template = '';
    let set = new Set(data);    
    data = [...set];    // 可以利用Set去做下简单的去重，可忽略这步

    for (let i = 0; i < data.length; i++) {
        template += `
            <div class="item">
                <h4>${data[i].title}</h4>
                <img src="${data[i].image}" width="200" height="150"/>
            </div>`;
    }
    return template;
}