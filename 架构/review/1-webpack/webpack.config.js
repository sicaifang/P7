const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');                   // 自动产出html
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');    // 分离css,less文件
const CleanWebpackPlugin = require('clean-webpack-plugin');                 // 清空打包目录
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');           // 压缩js 没什么用了，wp4默认npx webpack下就是压缩后的文件
// 编译分离Less文件并指定路径
const lessExtract = new ExtractTextWebpackPlugin('less/less.css');

// 处理图片路径问题
const PUBLIC_PATH = '/';   

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'dist'),
        // publicPath: PUBLIC_PATH
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'],
                // 拆分css
                use: ExtractTextWebpackPlugin.extract({
                    use: 'css-loader',
                    publicPath: '../'
                }),
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: lessExtract.extract({
                    use: ['css-loader', 'less-loader', 'postcss-loader'],    // postcss-loader利用autoprefixer自动补充前缀
                    publicPath: '../'       // 处理图片引用问题，如背景图
                })
            },
            {
                test: /\.(jpg|png|gif|svg)$/,   // 添加图片
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            outputPath: 'images/'
                        }
                    }   
                ]
            },
            {
                test: /\.(htm|html)$/,        // 在html中使用图片
                use: 'html-withimg-loader'
            }
        ]
    },
    plugins: [
        lessExtract,
        new HtmlWebpackPlugin({
            template: './src/index.html',
            hash: true,
        }),
        new ExtractTextWebpackPlugin('css/index.css'),
        new CleanWebpackPlugin(path.resolve('dist')),   // 打包前先清空输出目录
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 3000,
        open: true,
        hot: true
    }
}