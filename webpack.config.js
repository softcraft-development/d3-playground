
var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, "src"),
    devtool: "source-map",
    entry: "./index.js",
    module: {
        loaders: [{
            test: /\.js$/,
            // loaders: ['babel-loader?presets[]=es2015'],
            loader: "file-loader",
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'postcss', 'sass']
        }, {
            test: /\.sass$/,
            loader: 'style!css!sass?sourceMap'
        }, {
            test: /\.woff$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
        }, {
            test: /\.woff2$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
        }, {
            test: /\.(eot|ttf|svg|gif|png)$/,
            loader: "file-loader"
        }]
    },
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'index.html' },
        ])
    ]
};