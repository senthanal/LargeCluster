// plugins
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
    resolve: {
        extensions: ['.js', '.json', '.html'],
        modules: ["node_modules"]
    },
    module: {
        rules: [{
                test: /\.html$/,
                use: 'raw-loader',
                exclude: /node_modules/
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'ng-annotate-loader?ngAnnotate=ng-annotate-patched'
                }, {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                useBuiltIns: "usage",
                                corejs: 3
                            }]
                        ],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }]
            },
            {
                test: /\.json$/,
                use: 'json-loader',
                exclude: /node_modules/
            },
            {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: {
                        name: '[name].[hash].js',
                        inline: true
                    }
                },
                exclude: /node_modules/
            },
            {
                // Now we apply rule for images
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [{
                    // Using file-loader for these files
                    loader: "file-loader",

                    // In options we can set different things like format
                    // and directory to save
                    options: {
                        outputPath: 'images'
                    }
                }]
            },
            {
                // Apply rule for fonts files
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [{
                    // Using file-loader too
                    loader: "file-loader",
                    options: {
                        outputPath: 'fonts'
                    }
                }]
            },
            {
                // Apply rule for .sass, .scss or .css files
                test: /\.(sa|sc|c)ss$/,

                // Set loaders to transform files.
                // Loaders are applying from right to left(!)
                // The first loader will be applied after others
                use: [{
                        // After all CSS loaders we use plugin to do his work.
                        // It gets all transformed CSS and extracts it into separate
                        // single bundled file
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // This loader resolves url() and @imports inside CSS
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        // Then we apply postCSS fixes like autoprefixer and minifying
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: __dirname + '/postcss.config.js'
                            }
                        }
                    },
                    {
                        // First we transform SASS to standard CSS
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new HtmlWebpackPlugin({
            title: 'Large Cluster',
            template: "./app/index.ejs",
            filename: "index.html"
        }),
        new FaviconsWebpackPlugin('./app/images/favicon.png')
    ]
};