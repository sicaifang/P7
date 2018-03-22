let EventEmitter = require('events');
let {inherits} = require('util');
function Girl() {

}
// 只有inherits方法使用
// Girl继承EventEmitter
inherits(Girl, EventEmitter);   // {'失恋': [cry, eat]}c

let girl = new Girl();

function cry(params='你') {
    console.log('哭', params);
}

function eat(params='你') {
    console.log('吃', params);
}
// 订阅
girl.once('失恋', cry);
girl.on('失恋', eat);

// girl.removeAllListeners('失恋');

girl.removeListener('失恋', eat);

// 发布
girl.emit('失恋', '小白');
girl.emit('失恋');