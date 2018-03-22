// { '失恋', [eat, cry, shopping] }

class EventEmitter {
    constructor() {
        this._events = Object.create(null);
    }

    on(type, cb) {
        if (!this._events[type]) {
            this._events[type] = [cb];  // {'失恋': [cry]}
        } else {
            this._events[type].push(cb);    // {'失恋': [cry, shopping]}
        }
    }

    emit(type) {
        if (this._events[type]) {
            this._events[type].forEach(fn => fn());
        }
    }

    once(type, cb) {
        let wrap = () => {
            cb();
            this.removeListener(type, wrap);
        };

        this.on(type, wrap);  // 1.先绑定  2.要在cb中删除绑定
    }

    removeListener(type, cb) {
        if (this._events[type]) {
            this._events[type] = this._events[type].filter(fn => fn !== cb);
        }
    }
}

// 实例
let e = new EventEmitter();
let cry = () => console.log('哭');
let shopping = () => console.log('购物');
// 订阅
e.once('失恋', cry);
e.on('失恋', shopping);
// 删除
// e.removeListener('失恋', cry);
// 发布
e.emit('失恋');
e.emit('失恋');
e.emit('失恋');