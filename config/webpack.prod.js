const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

module.exports = webpackMerge(commonConfig({ENV: ENV}), {

  devtool: 'source-map',
  mode: 'production',

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
          keep_fnames: true
        }
      })
    ]
  },

  plugins: [
    /**
     * Stops the build if there is an error
     * */
    new NoEmitOnErrorsPlugin()
  ]
});
