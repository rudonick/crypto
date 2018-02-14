const path = require('path');
const webpack = require('webpack');
var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: PROD ? 'CryptoGost.min.js' : 'CryptoGost.js',
        libraryTarget:'umd'
    },
    resolve:{
        extensions:['.js','*']
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
    plugins:PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            compress:{warnings:false},
            comments:false
        })
    ] : [],
   
};
