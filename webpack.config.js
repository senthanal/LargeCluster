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
            {loader: 'bundle?name=[name]', include: path.resolve('./node_modules/angular-i18n')},
            {test: /\.html$/, loader: 'raw-loader', exclude: /node_modules/},
            {
                test: /\.js$/,
                loaders: ['ng-annotate-loader', 'babel-loader?cacheDirectory'],
                exclude: /node_modules/
            },
            {test: /\.json$/, loader: 'json-loader', exclude: /node_modules/},

            // inline base64 URLs for <=8k images, direct URLs for the rest
            {test: /\.(png|jpg|svg)$/, loader: 'url-loader?limit=8192'},

            // helps to load bootstrap's css.
            // Ref: https://github.com/AngularClass/angular2-webpack-starter/issues/696
            {test: /\.scss$/, loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']},
            {test: /\.css$/, loaders: ['style-loader', 'css-loader?sourceMap']},
            {test: /\.(woff2?|ttf|eot)$/, loader: 'url-loader?limit=100000'},
            {test: /bootstrap\/dist\/js\/umd\//, loader: 'imports-loader?jQuery=jquery'},
            {test: /rzslider.js|rzslider.min.js/, loaders: ['imports-loader?define=>false']}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({resource}) => /node_modules/.test(resource),
        }),
        new HtmlWebpackPlugin({
            title: 'Balckmap',
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
        new FaviconsWebpackPlugin('./app/images/senthanal_sirpi_manohar.png'),
        new ngAnnotatePlugin({
            add: true
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    externals: []
};
