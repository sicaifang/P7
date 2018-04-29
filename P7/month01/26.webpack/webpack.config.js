let  path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-wepack-plugin');



module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve('dist')
    },
    module: {
        rules: [
            {
                test:/\.css$/, use: [
                    {
                        loader: 'style-loader',
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin
    ],
    devServer: {
        contentBase: './dist',
        port: 3000,
        hot: true
    }   
}