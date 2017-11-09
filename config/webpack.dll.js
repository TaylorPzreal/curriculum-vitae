const webpack = require('webpack');
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
'jquery',
'bootstrap',
'ng2-toastr',
];

module.exports = {
  output: {
    path: helpers.root('dll'),
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]'
  },
  entry: {
    vendor: vendors
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]_[chunkhash]',
      context: __dirname
    })
  ]
}
