var webpackMerge = require('webpack-merge');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const SERVER = {
  host: 'localhost',
  port: '9000'
};

module.exports = webpackMerge(commonConfig, {

  module: {
    rules: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        'raw-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }, {
      test: /\.scss$/,
      include: /node_modules/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }, {
      test: /\.css$/,
      exclude: helpers.root('src', 'app'),
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.css$/,
      include: helpers.root('src', 'app'),
      use: [
        'raw-loader'
      ]
    }]
  },

  plugins: [
    // new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    compress: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    host: SERVER.host,
    port: SERVER.port
  }
});