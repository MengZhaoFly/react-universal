const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';
const config = {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public/'
    },
    devtool: 'inline-source-map',
    module: { 
        rules: [
            {
                test: /\.jsx$/,
                use: 'babel-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../client/templete.html')
        })
    ]
}
if (isDev) {
    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    }
    config.devServer = {
        host: '0.0.0.0',
        port: '8888',
        contentBase: config.output.path,
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public/',
        historyApiFallback: {
            index: '/public/index.html'
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config;
