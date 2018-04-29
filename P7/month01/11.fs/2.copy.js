let fs = require('fs');
let path = require('path');

/*function copy(source, target) {
    fs.readFile(path.resolve(source), function (err, data) {
        if (err) return console.log(err);
        fs.writeFile(path.resolve(target), data, function (err) {
            if (err) return console.log(err);
        })
    });
}
copy('1.txt', '2.txt');*/
// 内存8G 读一个20G的文件，肯定读不了

// node版本至少8.5以上
// fs.copyFile(path.resolve('1.txt'), path.resolve('2.txt'), function () {
//     console.log('拷贝成功');
// });


// 1G的文件 先弄个内存读一下，马上再去写

// 限制读取个数 手动读取
// fs.open打开文件，先打开文件，才能对文件操作

// fd   file descriptor   文件描述符 它代表对当前文件的描述
// process.stdout.write()
// process.stderr.write()

// 读取
/*
let buffer = Buffer.alloc(3);
fs.open(path.resolve('1.txt'), 'r', 0o666, function (err, fd) {
    console.log(fd);
    // offset表示的是buffer从哪个开始存储
    // length就是一次想读几个, 不能大于buffer长度
    // position 代表的是文件的读取位置，默认可以写null当前位置 从0开始
    fs.read(fd, buffer, 0, 3, 0, function (err, bytesRead) {
        // bytesRead 读取到的个数
        console.log(err, bytesRead);
    });
});*/

// 写入
// 如果flag是a追加 那你写的position参数就没用了
// flag有w,a,r,r+
/*
fs.open(path.resolve('3.txt'), 'r+', 0o666, function (err, fd) {
    fs.write(fd, Buffer.from('前端'), 0, 3, 3, function (err, bytesWritten) {
        if (err) return console.log(err);
        console.log(bytesWritten);
    });
});*/


function copy(source, target) {
    let size = 3;
    let buffer =Buffer.alloc(3);     // 每次来3个
    fs.open(path.resolve(source), 'r', function (err, rfd) {
        fs.open(path.resolve(target), 'w', function (err, wfd) {
            function next() {
                fs.read(rfd, buffer, 0, size, null, function (err, bytesRead) {
                    if (bytesRead > 0) {    // 读取完毕了 没读到东西就停止了
                        fs.write(wfd, buffer, 0, bytesRead, null, function (err, bytesWritten) {
                            next();
                        });
                    } else {
                        fs.close(rfd, function() {});
                        fs.fsync(wfd, function () {     // 确保内容 写入到文件中
                            fs.close(wfd, function () {
                                console.log('关闭并且拷贝成功');
                            });
                        });
                    }
                });
            }
            next();
        });
    });
}

copy('1.txt', '3.txt');



// 文件打开是需要关的
/*fs.open(path.resolve('1.txt'), 'r', function (err, fd) {
    console.log(fd);
});
fs.open(path.resolve('2.txt'), 'r', function (err, fd) {
    console.log(fd);
});
fs.open(path.resolve('3.txt'), 'r', function (err, fd) {
    console.log(fd);
});*/

fs.open(path.resolve('3.txt'), 'w', function (err, fd) {
    fs.write(fd, Buffer.from('后天'), 0, 6, null, function (err, bytesWritten) {
        // 当write方法触发了回调函数 并不是真正的文件被写入了，先把内容写到缓存区
        // 强制将缓存区的内容 写入后再关闭
        fs.fsync(fd, function () {
            fs.close(fd, function () {
                console.log('关闭');
            });
        });
    })
});
