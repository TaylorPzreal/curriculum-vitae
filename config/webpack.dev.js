var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');

const SERVER = {
  host: 'localhost',
  port: '9000'
};

module.exports = webpackMerge(commonConfig, {

  // module: {
  //   rules: []
  // },

  plugins: [
    new ExtractTextPlugin('[name].css')
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