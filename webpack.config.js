const path = require('path')
const HWP = require('html-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, '/src/app/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/src/public')},
   module:{
        rules:[{
           test: /\.js$/,
           exclude: /node_modules/,
           use: 'babel-loader'
        },
        {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }]
        }
        ]
    },
    devServer: {
        historyApiFallback: true,
      }
 }