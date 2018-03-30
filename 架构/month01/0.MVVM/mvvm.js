function Mvvm(options = {}) {
    this.$options = options;    // 将所有属性挂载到了$options，实际意义不大，这里是和vue一样
    // _data
    let data = this._data = this.$options.data;

    observe(data);
}
/// vm.$options
// observe 观察对象给对象增加ObjectDefineProperty

function Observer(data) {   // 在这里实现我们主要的逻辑，写在外面方便用来递归
    for (let key in data) { // 把data属性通过Object.defineProperty的方式定义
        let val = data[key];
        observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,   
            get() {
                return val;
            },
            set(newVal) {   // 更改值的时候
                if (newVal === val) {   // 设置的值和以前值一样就不理它
                    return;
                }
                val = newVal;   // 如果以后再获取值的时候，将刚才设置的值再返回去
            }
        });
    }    

}

function observe(data) {
    return new Observer(data);
}