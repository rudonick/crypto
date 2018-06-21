const helpers = require('./helpers');

const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = function (options) {

    const ENV = options.ENV ? options.ENV : 'production';

    return {
        output: {
            libraryTarget: 'umd',
            sourceMapFilename: '[file].map',
            library: 'crypto-gost-js'
        },

        resolve: {
            /**
             * An array of extensions that should be used to resolve modules.
             */
            extensions: ['.ts', '.js', '.html'],

            /**
             * An array of directory names to be resolved to the current directory
             */
            modules: [helpers.root('src'), helpers.root('node_modules')]
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                }
            ]
        },

        plugins: [
            new DefinePlugin({
                'process.env': {
                    'ENV': JSON.stringify(ENV),
                    'NODE_ENV': JSON.stringify(ENV)
                }
            })
        ]
    };
};
