const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const helpers = require('./helpers');

// 定义环境变量
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const SERVER = {
  host: 'localhost',
  port: '9000'
};

module.exports = {

  devtool: DEVELOPMENT ? 'cheap-module-eval-source-map' : 'source-map',

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  output: {
    path: helpers.root('dist'),
    publicPath: DEVELOPMENT ? `http://${SERVER.host}:${SERVER.port}/` : '/dist/',
    filename: DEVELOPMENT ? '[name].js' : '[name].[hash].js',
    chunkFilename: DEVELOPMENT ? '[id].chunk.js' : '[id].[hash].chunk.js'
  },

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
      test: /\.(png|jpe?g|gif|ico|svg)$/,
      use: DEVELOPMENT ?
        'url-loader?limit=50000&name=src/assets/images/[name].[hash].[ext]' : 'url-loader?limit=50000&name=src/assets/images/[name].[hash].[ext]&publicPath=/dist/',
      include: [helpers.root('src/assets/images')]
    }, {
      test: /\.(ttf|eot|woff|woff2|svg)([\w\?=\.]*)?$/,
      use: DEVELOPMENT ?
        'file-loader?name=fonts/[name].[hash].[ext]' : 'file-loader?name=fonts/[name].[hash].[ext]&publicPath=/dist/',
      include: [
        // helpers.root('fonts'),
        helpers.root('node_modules/font-awesome/fonts')
        // helpers.root('node_modules/bootstrap/dist/fonts')
      ]
    }, {
      test: /\.scss$/,
      include: helpers.root('src', 'app'),
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
      exclude: helpers.root('src', 'app'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => {
              return [
                require('precss'),
                require('autoprefixer')
              ];
            },
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      })
    }, {
      test: /\.css$/,
      exclude: helpers.root('src', 'app'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => {
              return [
                require('precss'),
                require('autoprefixer')
              ];
            },
            sourceMap: true
          }
        }]
      })
    }, {
      test: /\.css$/,
      include: helpers.root('src', 'app'),
      use: [
        'raw-loader'
      ]
    }]
  },

  plugins: [
    // Workaround for angular/angular#11580
    // new webpack.ContextReplacementPlugin(
    //   // The (\\|\/) piece accounts for path separators in *nix and Windows
    //   /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    //   helpers.root('./src'), // location of your src
    //   { } // a map of your routes
    // ),

    // 用于去掉浏览器console的warning
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), {}
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    }),

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function(module) {
    //     // this assumes your vendor imports exist in the node_modules directory
    //     return module.context && module.context.indexOf('node_modules') !== -1;
    //   }
    // }),
    // //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    // }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: DEVELOPMENT // workaround for ng2
      },
      // minimize: PRODUCTION, // 注释掉这行, 会导致 Build PROD, html tag can't found.
      debug: DEVELOPMENT,
      options: {
        context: __dirname
      }
    }),

    // manifest.json
    new ManifestPlugin({
      fileName: 'cv-manifest.json'
    }),

    // JS打包压缩
    new UglifyJSPlugin({
      sourceMap: DEVELOPMENT,
      beautify: DEVELOPMENT, // 最紧凑的输出
      compress: {
        warnings: DEVELOPMENT,
        drop_debugger: DEVELOPMENT,
        screw_ie8: true
      },
      mangle: {
        // Skip mangling these
        except: ['$super', '$', 'exports', 'require'],
        screw_ie8: true,
        keep_fnames: true
      },
      comments: DEVELOPMENT
    }),

    // 定义环境变量
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(PRODUCTION),
      DEVELOPMENT: JSON.stringify(DEVELOPMENT)
    }),

    // 实现文件顶部版权声明
    new webpack.BannerPlugin('Copyright www.honeymorning.com 2017 inc.')
  ]
};
