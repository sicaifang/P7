const EventEmitter = require('events');
const fs = require('fs');

class WriteStream extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.highWaterMark = options.highWaterMark || 16 * 1024;
        this.autoClose = options.autoClose || true;
        this.mode = options.mode;
        this.start = options.start || 0;
        this.flags = options.flags || 'w';
        this.encoding = options.encoding || 'utf8';


        this.buffers = [];
        // 标识 是否正在写入
        this.writing = false;
        // 是否满足触发drain事件
        this.needDrain = false;
        // 记录写入的位置
        this.pos = 0;
        // 记录缓存区的大小
        this.length = 0;
        this.open();

    }

    destory() {

    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                this.emit('error', err);
                if (this.autoClose) {
                    this.destory();
                }
            }
            this.fd = fd;
            this.emit('open');
        });
    }

    clearBuffer() {
        let buffer = this.buffers.shift();
        if (buffer) {
            this._write(buffer.chunk, buffer.encoding, () => this.clearBuffer());
        } else {
            if (this.needDrain) {
                this.needDrain = false; // 是否需要触发drain 需要就发射drain事件
                this.emit('drain');
            }
        }
    }

    _write(chunk, encoding, callback) {
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this._write(chunk, encoding, callback))
        }
        fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, byteWritten) => {
            this.length -= byteWritten;
            this.pos += byteWritten;
            callback();     // 清空缓存区的内容
        });
    }
}

module.exports = WriteStream;