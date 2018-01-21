let webpack = require('webpack');
let _ = require('lodash');
const path = require('path');

// plugins
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    entry: {
        app: __dirname + '/app/index.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: __dirname + '/dist',
        publicPath: ''
    },
    devtool: 'eval',
    bail: false,
    resolve: {
        extensions: ['.js', '.json']
    },
    module: {
        loaders: [
            {test: /\.html$/, loader: 'raw-loader', exclude: /node_modules/},
            {
                test: /\.js$/,
                loaders: ['ng-annotate-loader', 'babel-loader?cacheDirectory'],
                exclude: /node_modules/
            },
            {test: /\.json$/, loader: 'json-loader', exclude: /node_modules/},
            {
                test: /\.worker\.js$/,
                loader: 'worker-loader',
                options: { 
                    name: '[name].[hash].js',
                    inline: true 
                }
            },

            // inline base64 URLs for <=8k images, direct URLs for the rest
            {test: /\.(png|jpg|svg)$/, loader: 'url-loader?limit=8192'},

            // helps to load bootstrap's css.
            // Ref: https://github.com/AngularClass/angular2-webpack-starter/issues/696
            {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.css$/, loaders: ['style-loader', 'css-loader']},
            {
                test: /.(ttf|otf|eot|svg|woff|woff2?)(\?[a-z0-9]+)?$/,
                use: [{
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',    // where the fonts will go
                    publicPath: '../fonts/'       // override the default path
                  }
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({resource}) => /node_modules/.test(resource),
        }),
        new HtmlWebpackPlugin({
            title: 'LargeCluster',
            filename: 'index.html',
            template: 'app/index.html',
            inject: 'body', // all javascript resources will be placed at the bottom of the body element
            hash: true, // if true then append a unique webpack compilation hash to all included scripts and CSS files. This is useful for cache busting.
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        }),
        new FaviconsWebpackPlugin('./app/images/large-cluster.png'),
        new ngAnnotatePlugin({
            add: true
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    externals: []
};
