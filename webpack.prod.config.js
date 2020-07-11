const webpack = require('webpack');
const parentConf = require('./webpack.config');
const merge = require('webpack-merge');
const path = require('path');
const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
module.exports = merge(parentConf, {
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    resolve: {
        modules: [
            path.resolve('./node_modules')
        ]
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        new webpack.BannerPlugin({
            banner: pkg.name + "@version" + pkg.version, // the banner as string, it will be wrapped in a comment
            raw: false, // if true, banner will not be wrapped in a comment
            entryOnly: false, // if true, the banner will only be added to the entry chunks
        })
    ],
});