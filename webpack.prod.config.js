const webpack = require('webpack');
const parentConf = require('./webpack.config');
const merge = require('webpack-merge');
const path = require('path');
const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = merge(parentConf, {
    resolve: {
        modules: [
            path.resolve('./node_modules')
        ]
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin([path.resolve("./dist")], {}),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                // You can specify all variables that should not be mangled.
                // For example if your vendor dependency doesn't use modules
                // and relies on global variables. Most of angular modules relies on
                // angular global variable, so we should keep it unchanged
                except: ['$super', '$', 'exports', 'require', 'angular'],
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                drop_console: true
            },
            comments: false
        }),
        new webpack.BannerPlugin({
            banner: pkg.name + "@version" + pkg.version, // the banner as string, it will be wrapped in a comment
            raw: false, // if true, banner will not be wrapped in a comment
            entryOnly: false, // if true, the banner will only be added to the entry chunks
        })
    ],
});