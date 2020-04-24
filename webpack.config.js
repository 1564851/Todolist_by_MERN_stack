const path = require('path');
const Dotenv = require('dotenv-webpack');

const HtmlWebackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use:{
                        loader: 'file-loader',
                    },
            }
        ]
    },
    plugins: [
        new HtmlWebackPlugin({
            template: './src/index.html'
        }),
        new Dotenv()
    ]
}