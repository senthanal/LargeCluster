let webpack = require('webpack');
let parentConf = require('./webpack.config');
let _ = require('lodash');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
let dashboard = new Dashboard();
module.exports = _.merge(parentConf, {
    resolve: {
        modules: ["node_modules"]
    },
    devtool: "cheap-module-eval-source-map",
    cache: true,
    plugins: parentConf.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new DashboardPlugin(dashboard.setData)
    ]),
    devServer: {
        historyApiFallback: true,
        quiet: true, // lets WebpackDashboard do its thing
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 300,
            poll: 1000
        },
        contentBase: 'dist',
        // open: true,
        stats: {
            colors: true
        }
    }
});