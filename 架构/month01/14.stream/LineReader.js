// LineReader 读取器
const fs = require('fs');
const EventEmitter = require('events');

// windows下 换行回车是\r\n 0x0d 0x0a
// mac下 是 \n
class LineReader extends EventEmitter {
    constructor(path) {
        super();
        this.RETURN = 0x0d; // 回车
        this.LINE = 0x0a;   // 换行
        this.buffer = [];
        this._rs = fs.createReadStream(path);   // 默认情况下会先读highWaterMark(没写的话默认是64k)
        this.on('newListener', eventName => {
            if (eventName === 'line') {
                // 要一个一个读，监听readable
                this._rs.on('readable', () => {
                    let char;
                    // 读出来的内容都是buffer类型
                    while (char = this._rs.read(1)) {
                        let current = char[0];

                        switch (current) {
                            case this.RETURN:
                                this.emit('line', Buffer.from(this.buffer).toString());
                                this.buffer.length = 0;
                                // 继续读一个
                                let c = this._rs.read(1);
                                // 读取\r后 看一下下一个是不是\n 如果不是就表示它是一个正常的
                                if (c !== this.LINE) {
                                    this.buffer.push(c);
                                }
                                break;
                            case this.LINE: // mac下只会执行\n
                                this.emit('line', Buffer.from(this.buffer).toString());
                                this.buffer.length = 0;
                                break;
                            default:
                                this.buffer.push(current);
                        }
                    }
                });
                this._rs.on('end', () => {
                    this.emit('line', Buffer.from(this.buffer).toString());
                    this.buffer.length = 0;
                });
            }
        });
    }

}


let lineReader = new LineReader('./1.txt');
lineReader.on('line', data => {
    console.log(data);
});