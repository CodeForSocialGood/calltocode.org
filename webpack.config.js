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
    main: './index.js',
    vendor: [
      // vendors added here will be included in vendor chunk
      // so they only get requested once and can easily be cached
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'react-redux',
      'prop-types',
      'lodash'
    ]
  },

  output: {
    path: path.join(__dirname, 'server', 'public'),
    publicPath: '/',
    filename: '[name].[chunkhash].js' // adding the chunk hash helps with caching, easier to tell when file has changed
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
    }),

    new webpack.HashedModuleIdsPlugin(), // ensures vendor bundle hash only changes when it needs to

    // CommonsChunkPlugin makes sure we don't have the same modules included in multiple chunks
    new webpack.optimize.CommonsChunkPlugin({ // vendor must be included before manifest
      name: 'vendor'
    }),

    new webpack.optimize.CommonsChunkPlugin({ // separate the webpack manifest from our main chunk
      name: 'manifest'
    })
  ],

  devtool: 'source-map'
}

module.exports = config
