// 默认情况下叫webpack.config.js
// webpack是基于node的 用的语法都是CommonJS规范
const path = require('path');
// 多个入口  是没有关系的但是想打包到一起去 可以写一个数组，实现多个文件打包成一个文件
let HtmlWebpackPlugin = require('html-webpacl-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
// index.js是属于index.html  a.js是属于a.html
// 多页面开发  怎么配置多页面
module.exports = {
    // entry: './src/index.js',       // 入口文件
    // entry: ['./src/index.js', './src/my.js'],
    entry: {
        index: './src/index.js',
        a: './src/a.js'
    },
    output: {
        // filename: 'main.js',
        filename: '[name].[hash8].js',
        // 路径必须是绝对路径
        path: path.join(__dirname, 'dist')
    },      // 出口文件 对象
    module: {},      // 对模块的处理  loader加载器
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        // new HtmlWebpackPlugin({
        //     template: './src/index.html',   // 用哪个html作为模板
                // hash: true,
        //     minify: {
        //         // collapseWhitespace: true,
                    // removeAttributeQuotes: true
        //     }
        // })
    ],     // 对应的插件
    devServer: {},   // 开发服务器的配置
    //mode: 'development'     //模式的配置,也可以在package.json里配置上
};

// 实现html打包功能，可以通过一个模板实现打包出引用好路径的html