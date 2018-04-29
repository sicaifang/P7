const fs = require('fs');
const EventEmitter = require('events');

class ReadStream extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.autoClose = options.autoClose || true;
        this.start = 0;
        this.end = options.end;
        this.flags = options.flags || 'r';


        this.buffers = [];  // 缓存区
        this.pos = this.start;
        this.length = 0;    // 缓存区大小
        this.emittedReadable = false;   // 是否触发可读流事件
        this.reading = false;   // 不是正在读取的

        this.open();
        this.on('newListener', (eventName) => {
            if (eventName === 'readable') {
                this.read();
            }
        });
    }

    read(n) {

        if (n > this.length) {
            // 更改缓存区大小  读取5个就找 2的几次方最近的
            this.highWaterMark =
            this.emittedReadable = true;
            this._read()
        }
        // 如果n>0 去缓存区取吧
        let buffer = null;
        let index = 0;  // 维护buffer的索引
        let flag = true;

        if (n > 0 && n <= this.length) {
            // 在缓存区中取 [buffer, buffer]
            buffer = Buffer.alloc(n);  // 这是要返回的buffer
            let buf;
            // 取buffers数组里的第一个赋给buf，如果没有值了就是undefined了，while循环结束
            while (flag && (buf = this.buffers.shift())) {
                for (let i = 0; i < buf.length; i++) {
                    buffer[index++] = buf[i];
                    if (index === n) {  // 拷贝够了，不需要拷贝了
                        flag = false;
                        this.length -= n;
                        let bufferArr = buf.slice(i+1);     // 取出留下的部分
                        // 如果有剩下的内容 再放入缓存中
                        if (bufferArr.length > 0) {
                            this.buffers.unshift(bufferArr);
                        }
                        break;
                    }
                }
            }
        }
        // 当缓存区 小于highWaterMark时再去读取
        if (this.length === 0) {
            this.emittedReadable = true;
        }
        if (this.length < this.highWaterMark) {
            if (!this.reading) {
                this.reading = true;
                this._read();
            }
        }
        return buffer;
    }

    // 封装的读取的方法
    _read() {
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this._read());
        }
        // 上来我要喝水 先倒三升水 [两升水，三升水]
        let buffer = Buffer.alloc(this.highWaterMark);
        fs.read(this.fd, buffer, 0, buffer.length, this.pos, (err, bytesRead) => {
            if (bytesRead > 0) {
                // 默认读取的内容放到缓存区中
                this.buffers.push(buffer.slice(0, bytesRead));
                this.pos += bytesRead;      // 维护读取的索引
                this.length += bytesRead;   // 维护缓存区的大小
                this.reading = false;

                // 是否需要触发readable事件
                if (this.emittedReadable) {
                    this.emittedReadable = false;   // 下次默认不触发
                    this.emit('readable');
                }
            } else {
                this.emit('end');
                this.destory();
            }
        });
    }

    open() {
        fs.open(this.path, this.flags, 0o666, (err, fd) => {
            if (err) {
                this.emit('error', err);
                if (this.autoClose) {
                    this.destory();
                }
                return;
            }
            this.fd = fd;
            this.emit('open');
        });
    }

    destory() {
        if (typeof this.fd !== 'number') {
            return this.emit('close');
        }
        fs.close(this.fd, () => {
            this.emit('close');
        });
    }
}

module.exports = ReadStream;