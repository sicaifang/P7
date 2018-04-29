process.on('message', msg => {
    process.send(msg.name + '-火箭队');
});