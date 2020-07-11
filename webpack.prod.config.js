const webpack = require('webpack');
let webpackMerge = require('webpack-merge');
const parentConf = require('./webpack.config');
const path = require('path');
const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
module.exports = webpackMerge(parentConf, {
    mode: "production",
    devtool: false,
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    resolve: {
        modules: [
            path.resolve('./node_modules')
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'PRODUCTION': JSON.stringify('production')
        }),
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