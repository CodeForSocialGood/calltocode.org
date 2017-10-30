const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const srcDir = path.join(__dirname, 'client', 'src')

const config = {
  context: srcDir,

  entry: {
    index: './index.js'
  },

  output: {
    path: path.join(__dirname, 'client', 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader?sourceMap',
          use: 'css-loader?modules&importLoaders=1&localIdentName="[local]__[hash:base64:5]"'
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader?sourceMap',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [
            'css-loader?modules&importLoaders=1&localIdentName="[local]__[hash:base64:5]"',
            'sass-loader?sourceMap'
          ],
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'index.html')
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    }),
  ],

  devtool: 'source-map'
}

module.exports = config
