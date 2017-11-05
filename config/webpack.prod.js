var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
// const helpers = require('./helpers');
// const { AngularCompilerPlugin } = require('@ngtools/webpack');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {

  // module: {
  //  rules: [{
  //    test: /\.ts$/,
  //    loader: '@ngtools/webpack'
  //  }] 
  // },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(), // 如果出错就停止构建
    // new AngularCompilerPlugin({
    //   tsConfigPath: helpers.root('tsconfig.json'),
    //   entryModule: helpers.root('src/app/app.module#AppModule')
    // }),

    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    }),
    
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),

    // Gzip
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8
    }),

    // 本地进行webpack-bundle-analyzer
    // new BundleAnalyzerPlugin({
    //   // Can be `server`, `static` or `disabled`. 
    //   // In `server` mode analyzer will start HTTP server to show bundle report. 
    //   // In `static` mode single HTML file with bundle report will be generated. 
    //   // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`. 
    //   analyzerMode: 'server',
    //   // Host that will be used in `server` mode to start HTTP server. 
    //   analyzerHost: '127.0.0.1',
    //   // Port that will be used in `server` mode to start HTTP server. 
    //   analyzerPort: 8888,
    //   // Path to bundle report file that will be generated in `static` mode. 
    //   // Relative to bundles output directory. 
    //   reportFilename: 'report.html',
    //   // Automatically open report in default browser 
    //   openAnalyzer: true,
    //   // If `true`, Webpack Stats JSON file will be generated in bundles output directory 
    //   generateStatsFile: false,
    //   // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`. 
    //   // Relative to bundles output directory. 
    //   statsFilename: 'stats.json',
    //   // Options for `stats.toJson()` method. 
    //   // For example you can exclude sources of your modules from stats file with `source: false` option. 
    //   // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21 
    //   statsOptions: null,
    //   // Log level. Can be 'info', 'warn', 'error' or 'silent'. 
    //   logLevel: 'info'
    // })
  ]
});