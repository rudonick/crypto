const helpers = require('./helpers');

const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = function (options) {

    const ENV = options.ENV ? options.ENV : 'production';
    const isProdMode = ENV === 'production';

    return {

        entry: './src/index.js',

        output: {
            path: isProdMode ? helpers.root('dist') : helpers.root('dist-dev'),
            filename: isProdMode ? 'CryptoGost.min.js' : 'CryptoGost.js',
            libraryTarget: 'umd',
            sourceMapFilename: '[file].map',
            library: 'crypto-gost'
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
