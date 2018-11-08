const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = webpackMerge(commonConfig({ ENV: ENV }), {
    target: 'node',
    devtool: 'eval-source-map',
    mode: 'development',
    entry: './src/lib-usage.js',

    output: {
        path: helpers.root('dist-dev'),
        filename: 'CryptoGost.js'
    },

    devServer: {
        compress: true,
        disableHostCheck: true,
        historyApiFallback: true,
        contentBase: './dist-dev',
        proxy: {
            // following URL can be used for development:
            // '/some-url/': 'https://google.com'
        },
        watchOptions: {
            ignored: /node_modules/
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
});
