let crypto = require('crypto');
let fs = require('fs');

// 加密算法： 加密后可以解密
// md5并不叫加密算法，因为不可逆，倒推不出来，摘要算法
// md5 1)不可逆  2) 不同的内容输出的结果不同 3) 相同的内容输出的一定一样 4) 最终的加密结果长度一样
// console.log(crypto.getHashes());


// let md5 = crypto.createHash('md5');
// let result = md5.update('jay').digest('hex');   // hex是十六进制
// console.log(result);




// 一个非常大的文件
let md5 = crypto.createHash('md5');
let rs = fs.createReadStream('./content.txt', {highWaterMark: 2});
rs.on('data', chunk => {
    md5.update(chunk); 
});
rs.on('end', () => {
    console.log(md5.digest('hex'));
});
// 可以采用多次update来更新大文件
// 67461abf2a4b683e7a8138aa7c011b6e


// Hmac 加盐算法  可以根据一个所谓的密钥来加密
let m = crypto.createHmac('sha1',fs.readFileSync('./content.txt'));
m.update('ok');
console.log(m.digest('hex'));

// 不可逆
// openssl genrsa -out rsa_private.key 1024



// 对称加密 用一把钥匙可以 加密也可以解密
let private = fs.readFileSync('/.rsa_private.key');