// 会自动将这个描述符包装成可写流
setInterval(() => {
    process.stdout.write('hi ')
}, 1000);