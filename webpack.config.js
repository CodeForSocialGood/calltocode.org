const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HardSourcePlugin = require('hard-source-webpack-plugin')

const env = require('./.setup/client/env')
const clientDir = path.join(__dirname, 'client')

const config = {
  context: clientDir,

  entry: {
    index: './index.js'
  },

  output: {
    path: path.join(__dirname, 'server', 'public'),
    filename: 'client.js'
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
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader?sourceMap',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [
            'css-loader?modules&importLoaders=1&localIdentName="[local]__[hash:base64:5]"',
            'sass-loader?sourceMap'
          ]
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
      template: path.join(clientDir, 'index.html')
    }),

    new ExtractTextPlugin({
      filename: 'client.css'
    }),

    new webpack.DefinePlugin({
      $_ENV: JSON.stringify(env)
    }),

    new CopyPlugin([
      {from: path.join(clientDir, 'robots.txt')}
    ]),

    new HardSourcePlugin({
      cacheDirectory: path.join('..', '..', 'node_modules', '.cache', 'hard-source', '[confighash]')
    })
  ],

  devtool: 'source-map'
}

module.exports = config
