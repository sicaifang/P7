let fs = require('fs');
let path = require('path');

// 怎么创建文件夹
// fs.mkdirSync
// 目录创建必须保证父级存在
// fs.mkdir('a', function () {
//
// });


// 创建目录 makep mkdir a/b/c
// 同步创建 性能低
// 记住：如果是异步的永远不能用for循环  (for循环属于同步操作)
/*
function makep(dir) {
    let paths = dir.split('/');

    for(let i = 1; i <= paths.length; i++) {
        let newPath = paths.slice(0, i).join('/');
        // 创建目录需干一件事
        try {
            fs.accessSync(newPath, fs.constants.R_OK);
        } catch(e) {
            fs.mkdirSync(newPath);
        }
    }
}

makep('js/pages/utils');*/

// 删除目录
// fs.rmdirSync('a')
// fs.rmdir('a', () => {})

// 删除文件
// fs.unlink('1.txt');
// fs.unlink('1.txt', () => {});

// 判断文件夹中的内容，是文件还是文件夹
/*
fs.stat('css', function (err, stat) {   // stat文件夹的状态
    console.log(stat.isDirectory());    // 判断是不是文件夹
    console.log(stat.isFile());         // 判断是不是文件
    
    // 读取当前文件夹下的内容
    if (stat.isDirectory()) {
        fs.readdir('css', function (err, files) {
            console.log(files); // ['style']是个数组
        });
    }
});*/

// 异步创建
/*function mkdirAsync(dir, cb) {
    let paths = dir.split('/');
    
    function next(index) {
        if (index > paths.length) {
            return cb();
        }
        let newPath = paths.slice(0, index).join('/');
        fs.access(newPath, function (err) {
            if (err) {
                // 如果文件夹不存在就创建
                fs.mkdir(newPath, function (err) {
                    // 创建后 继续创建下一个
                    next(index+1);
                });
            } else {
                next(index+1);  // 这个文件夹存在了 那就创建下一个文件夹
            }
        });
    }
    
    next(1);
}
mkdirAsync('css/style/common', function () {
    console.log('创建文件夹完成');
});*/



// 删除目录实现
// 同步版
/*function removeDir(dir) {
    let files = fs.readdirSync(dir);
    for (let i = 0; i < files.length; i++) {
        let paths = path.join(dir, files[i]);
        console.log(files[i]);
        let stat = fs.statSync(paths);

        if (stat.isDirectory()) {
            // 如果是文件夹 就递归走下去
            removeDir(paths);
        } else {
            fs.unlinkSync(paths);
        }
    }
    fs.rmdirSync(dir);  // 如果文件夹是空的就将自己删掉
}

removeDir('a');*/

// 异步删除 Promise版
/*
function removePromise(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, function (err, stat) {
            if (stat.isDirectory()) {
                fs.readdir(dir, function (err, files) {
                    files = files.map(file => path.join(dir, file));    // [js/pages, js/components]
                    console.log(files);
                    files = files.map(file => removePromise(file));
                    console.log(files);
                    Promise.all(files).then(function () {
                        fs.rmdir(dir, resolve);
                    });
                });
            } else {
                // 如果是文件  删除文件  直接变成成功态即可
                fs.unlink(dir, resolve);
            }
        });
    });
}

removePromise('a').then(function () {
    console.log('删除');
});*/

// 异步删除
/*
function rmdir(dir, cb) {
    console.log(dir);
    fs.readdir(dir, function (err, files) {
        // 读取到文件
        function next(index) {
            if (index === files.length) return fs.rmdir(dir, cb);

            let paths = path.join(dir, files[index]);
            fs.stat(paths, function (err, stat) {
                if (stat.isDirectory()) {   // 如果是文件夹
                    // 要读的是b里的第一个 而不是去读c
                    // 如果b里的内容没有了 应该去遍历c
                    rmdir(paths, () => next(index + 1));
                } else {
                    fs.unlink(paths, () => next(index + 1));
                }
            });
        }
        
        next(0);
    });
}
rmdir('css', function () {
    console.log('被删了');
});*/


// 广度优先算法
function preWide(dir) {
    let arr = [dir];    // 存放目录结构的数组
    let index = 0;      // 指针
    let current;
    
    while (current = arr[index++]) {
        let stat = fs.statSync(current);
        if (stat.isDirectory()) {
            let files = fs.readdirSync(current);
            // [a, a/b, a/c, a/b/d, a/b/e, a/c/m]
            arr = [...arr, ...files.map(file => {
                return path.join(current, file);
            })];
        }
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        let stat = fs.statSync(arr[i]);
        if (stat.isDirectory()) {
            fs.rmdirSync(arr[i]);
        } else {
            fs.unlinkSync(arr[i]);
        }
    }
    console.log(arr);
}

preWide('a');

