let EventEmitter = require('events');   // 需要事件发射
let fs = require('fs');

// 继承事件发射EventEmitter
class WriteStream extends EventEmitter {
    constructor(path, options) {
        super();    // 继承
        this.path = path;
        this.highWaterMark = options.highWaterMark || 16 * 1024;
        this.autoClose = options.autoClose || true;
        this.encoding = options.encoding || null;
        this.mode = options.mode;
        this.start = options.start || 0;
        this.flags = options.flags || 'w';

        // 可写流 要有一个缓存区，当正在写入文件时，内容要写入到缓存区里
        // 在源码中是一个链表 => 我们就直接用个[]来实现

        this.buffers = [];
        // 标识 是否正在写入
        this.writing = false;

        // 是否满足触发drain事件
        this.needDrain = false;

        // 记录写入的位置
        this.pos = 0;

        // 用buffers计算的话，每增加一项都需要遍历一遍，维护起来性能太高
        // 所以记录缓存区的大小
        this.length = 0;

        this.open();    // 首先还是要打开文件获取到fd(文件描述符)
    }

    destory() {
        if (typeof this.fd !== 'number') {
            return this.emit('close');
        }
        fs.close(this.fd, () => {
            this.emit('close');
        });
    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                this.emit('error', err);
                // 看一下是否会自动关闭
                if (this.autoClose) {
                    this.destory();  // 销毁
                }
                return;
            }
            this.fd = fd;
            this.emit('open');  // 触发open事件，表示当前文件打开了
        });
    }

    write(chunk, encoding = this.encoding, callback) {
        // 通过fs.write()写入时，chunk需要改成buffer类型，并且用我们指定的转码格式去转换
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding);
        // write 返回一个布尔类型
        // chunk.length就是要写入的长度
        this.length += chunk.length;
        let result = this.length < this.highWaterMark;  // 比较是否达到了缓存区的大小
        this.needDrain = !result;   // 是否需要触发needDrain

        if (this.writing) {
            // 如果是正在写入，就先把内容放到缓存区里
            // 数组里存入一个对象，分别对应chunk, encoding, callback
            this.buffers.push({
                chunk,
                encoding,
                callback
            });
        } else {
            // 专门用来将内容 写入到文件内
            this.writing = true;
            this._write(chunk, encoding, () => {
                callback();
                this.clearBuffer();
            });
            // 每一次写完后都需要把buffers(缓存区)里的内容清空掉
            // 当buffers数组里是空的时候会触发drain事件
        }

        return result;
    }

    _write(chunk, encoding, callback) {
        // 判断是否有fd文件描述符，只有在打开文件成功的时候才会有fd
        // 所以如果没有的话，需要触发一次open事件，拿到fd都再调_write方法
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this._write(chunk, encoding, callback));
        }
        fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, bytesWritten) => {
            this.length -= bytesWritten;    // this.length记录缓存区大小，写之后length需要再减掉写入的个数
            this.pos += bytesWritten;
            this.writing = false;
            callback(); // 清空缓存区内容
        });
    }

    clearBuffer() {
        let buf = this.buffers.shift();
        if (buf) {  // 如果有值，接着写
            this._write(buf.chunk, buf.encoding, () => {
                buf.callback();
                this.clearBuffer();
            });
        } else {    // 缓存区已经空了
            if (this.needDrain) {   // 是否需要触发drain 需要就发射drain事件
                this.needDrain = false;
                this.emit('drain');
            }
        }
    }
}

module.exports = WriteStream;