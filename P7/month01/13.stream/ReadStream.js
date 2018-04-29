const fs = require('fs');
const EventEmitter = require('events');

class ReadStream extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.autoClose = options.autoClose || true;
        this.highWaterMark = options.highWaterMark || 64 * 1024;    // 默认是64k
        this.start = options.start || 0;
        this.end = options.end;
        this.encoding = options.encoding || null;

        this.open();    // 打开文件，获取fd文件描述符

        this.flowing = null;    // null就是暂停模式

        // 要建立一个buffer 这个buffer就是一次要读多少
        this.buffer = Buffer.alloc(this.highWaterMark);

        this.pos = this.start;
        // 看是否监听了data事件，如果监听了，就变成流动模式
        this.on('newListener', eventName => {
            if (eventName === 'data') {
                // 相当于用户监听了data事件
                // 此时监听了data会疯狂的触发
                this.flowing = true;
                // 监听了 就去读
                this.read();    // 读内容
            }
        });

    }

    read() {
        // console.log(this.fd);   // 直接读fd为undefined因为open事件是异步的，此时还拿不到fd
        // 此时文件还没打开呢
        if (typeof this.fd !== 'number') {
            // 当文件真正打开的时候   会触发open事件   触发事件后再执行read    此时fd肯定有了
            return this.once('open', () => this.read());
        }

        // 现在有fd了
        let howMuchToRead = this.end ? Math.min((this.end - this.pos + 1), this.highWaterMark) : this.highWaterMark;
        fs.read(this.fd, this.buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {
            if (bytesRead > 0) {
                // 读到了多少个  累加
                this.pos += bytesRead;
                let buf = this.buffer.slice(0, bytesRead);  // 截取buffer对应的值
                let data = this.encoding ? buf.toString(this.encoding) : buf.toString();
                this.emit('data', data);
                // 如果读取的位置 大于 结束位置 就代表读完了，触发一个end事件
                if (this.pos > this.end) {
                    this.emit('end');
                    this.destory();
                }
                if (this.flowing) {     // 流动模式继续触发
                    this.read();
                }
            } else {
                this.emit('end');   // 文件都读完了
                this.destory();
            }

        });
    }


    pause() {
        this.flowing = false;
    }

    resume() {
        this.flowing = true;
        this.read();
    }

    destory() {
        // 先判断有没有fd 有关闭文件 触发close事件
        if (typeof this.fd === 'number') {
            fs.close(this.fd, () => {
                this.emit('close');
            });
            return;
        }
        this.emit('close');
    }

    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                this.emit('error', err);
                if (this.autoClose) {   // 文件打开报错了，是否自动关闭掉
                    this.destory();     // 销毁
                }
                return;
            }

            this.fd = fd;   // 保存文件描述符
            this.emit('open');  // 文件打开了
        });
    }
}


module.exports = ReadStream;

