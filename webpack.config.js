const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
/* allow us to visualise our bundles and optimise
const Visualizer = require('webpack-visualizer-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
*/

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
      'redux-form',
      'prop-types',
      'lodash',
      'material-ui'
    ]
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        default: false,
        vendors: false
      }
    }
  },

  output: {
    path: path.join(__dirname, 'server', 'public'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
    // adding the chunk hash helps with caching, easier to tell when file has changed
    // but make sure to delete contents of output folder each time before running yarn build
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
          // resolve-url-loader may be chained before sass-loader if necessary
          use: [
            'css-loader?modules&importLoaders=1&localIdentName="[local]__[hash:base64:5]"',
            'sass-loader?sourceMap'
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
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
    new CleanPlugin(['server/public/'], {root: __dirname}),

    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(clientDir, 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),

    new ExtractTextPlugin({
      filename: '[name].css'
    }),

    new webpack.DefinePlugin({
      $_ENV: JSON.stringify(env)
    }),

    new CopyPlugin([
      {from: path.join(clientDir, 'robots.txt')}
    ]),

    // ensures vendor bundle hash only changes when it needs to
    new webpack.HashedModuleIdsPlugin() /*,

    new Visualizer()
    */
    /*
      turn on to create a visualisation of module sizings with each build
      will be output as stats.html in the output directory after running yarn build
    */
    /*,
    new BundleAnalyzerPlugin()
    */
    /*
       turn on to create an interactive treemap visualization of the contents of all our bundles
       will open automatically after running yarn build

       these plugins are going to really help us as the app grows
       and we split it into multiple chunks
       to make sure common components and vendor packages
       aren't being requested multiple times without need
      */
  ],

  devtool: 'source-map'
}

module.exports = config
