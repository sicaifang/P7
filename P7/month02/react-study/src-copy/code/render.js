class Element {
    constructor(type, props) {
        this.type = type;
        this.props = props;
    }
}

let React = {
    createElement(type, props, ...children) {
        if (children.length === 1) children = children[0];
        return new Element(type, { ...props, children })
    }
};

let ele = React.createElement(
    "h1",
    { className: "small" },
    React.createElement(
        "span",
        null,
        "\u5C0F\u59D0\u59D0"
    )
);


function render(obj, wrap) {
    let { type, props } = obj;
    let ele = document.createElement(type);
    for (let key in props) {
        if (key !== 'children') {
            if (key === 'className') {
                ele.setAttribute('class', props[key]);
            } else {
                ele.setAttribute(key, props[key]);
            }
        } else {
            // 是我们儿子节点
            let children = props[key];
            if (Array.isArray(children)) {
                // 是数组
                children.forEach(child => {
                    if (child instanceof Element) {
                        render(child, ele);
                    } else {
                        ele.appendChild(document.createTextNode(child));
                    }
                });
            } else {
                if (children instanceof Element) {
                    render(children, ele);
                } else {
                    ele.appendChild(document.createTextNode(children));
                }
            }
        }
    }
    wrap.appendChild(ele);
}

// render(ele, document.getElementById('root'));
render(ele, window.root);