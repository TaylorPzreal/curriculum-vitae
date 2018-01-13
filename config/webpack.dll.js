const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const helpers = require('./helpers');

const vendors = [
'@angular/platform-browser',
'@angular/platform-browser-dynamic',
'@angular/platform-browser/animations',
'@angular/core',
'@angular/common',
'@angular/http',
'@angular/forms',
'@angular/router',
'@angular/compiler',
'@angular/animations',
'rxjs',
'hammerjs',
'ng2-toastr',
];

module.exports = {
  output: {
    path: helpers.root('dll'),
    filename: '[name].[chunkhash].dll.js',
    library: '[name]_[chunkhash]'
  },
  entry: {
    vendor: vendors
  },
  plugins: [
    new webpack.DllPlugin({
      path: helpers.root('dll/vendor-manifest.json'),
      name: '[name]_[chunkhash]',
      context: __dirname
    }),
    new UglifyJsPlugin({
      test: /\.js$/i,
      extractComments: false,
      sourceMap: false,
      cache: false,
      parallel: false,
      uglifyOptions: {
        output: {
          ascii_only: true,
          comments: false,
          webkit: true
        },
        ecma: 5,
        warnings: false,
        ie8: false,
        mangle: {
          safari10: true
        },
        compress: {
          comparisons: false,
          pure_getters: true,
          passes: 3
        }
      }
    }),
  ]
}
