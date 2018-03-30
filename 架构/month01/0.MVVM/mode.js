
function Dep() {
    this.res = [];
}
// 添加发布到数组
Dep.prototype.addSub = function(sub) {
    this.res.push(sub);
};

Dep.prototype.subs = function() {
    this.res.forEach(sub => sub.update());
};

function Watcher(fn) {
    this.fn = fn
}

Watcher.prototype.update = function() {
    this.fn();
};

let watcher = new Watcher(() => console.log(1111));
let dep = new Dep();
dep.addSub(watcher);
dep.addSub(watcher);
dep.subs();