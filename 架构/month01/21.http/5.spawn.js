let {spawn} = require('child_process');
let path = require('path');

let child1 = spawn('node', ['1.test.js', 'a', 'b', 'c'], {
    cwd: path.join(__dirname, 'pro')
});

let child2 = spawn('node', ['2.test.js', 'c', 'h', 'd'], {
    cwd: path.join(__dirname, 'pro')
});


child1.stdout.on('data', data => {
    console.log(data.toString());
    child2.stdout.write(data);
});
