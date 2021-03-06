var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [{
      enforce: 'pre',
      test: /\.ts/,
      use: [{
        loader: 'tslint-loader',
        options: {
          tsConfigFile: helpers.root('src/tsconfig.json')
        }
      }]
    }, {
      test: /\.ts$/,
      loaders: [{
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: helpers.root('src', 'tsconfig.json')
        }
      }, 'angular2-template-loader']
    }, {
      test: /\.html$/,
      loader: 'html-loader',
      include: [
        helpers.root('src')
      ]
    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      loader: 'null-loader'
    }, {
      test: /\.scss$/,
      exclude: helpers.root('src', 'app'),
      use: [
        'null-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }, {
      test: /\.scss$/,
      include: helpers.root('src', 'app'),
      use: [{
        loader: 'raw-loader'
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    }, {
      test: /\.css$/,
      exclude: helpers.root('src', 'app'),
      loader: 'null-loader'
    }, {
      test: /\.css$/,
      include: helpers.root('src', 'app'),
      loader: 'raw-loader'
    }]
  },

  plugins: [
    // new webpack.ContextReplacementPlugin(
    //   // The (\\|\/) piece accounts for path separators in *nix and Windows
    //   /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    //   helpers.root('./src'), // location of your src
    //   {} // a map of your routes
    // )

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), {}
    ),

    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: true // workaround for ng2
      },
      // minimize: PRODUCTION,
      debug: false,
      options: {
        context: __dirname
      }
    })
  ]
};