const Promise = require('./demo');

let p = new Promise(function (resolve, reject) {
    resolve('专属天使');
});

p.then(function (data) {
    console.log(data);
    return 'Tank ' + data;
}).then(function (d) {
    console.log(d);
})