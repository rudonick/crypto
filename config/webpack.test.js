const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const DEFAULT_WEBPACK_TARGET = 'web';

function getTargetProperty() {
    let target = helpers.getCliArgValue('--target') || DEFAULT_WEBPACK_TARGET;
    console.log(`Webpack target: ${target}\n`);
    return {
        target
    }
}

module.exports = webpackMerge(commonConfig({ ENV: ENV }), {
    devtool: 'eval-source-map',
    mode: 'development',
    entry: './test/index.js',

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
},getTargetProperty());
