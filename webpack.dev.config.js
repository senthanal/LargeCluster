let webpackMerge = require('webpack-merge');
let parentConf = require('./webpack.config');
let path = require('path');
module.exports = webpackMerge(parentConf, {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    cache: true,
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true
    }
});