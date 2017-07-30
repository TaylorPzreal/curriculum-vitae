const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const os = require('os');
const helpers = require('./helpers');
const path = require('path');

const PHASER_DIR = helpers.root('/node_modules/phaser-ce');


// 定义环境变量
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const SERVER = {
  host: 'localhost',
  port: '9000'
};

module.exports = {
  cache: true,
  devtool: DEVELOPMENT ? 'cheap-module-eval-source-map' : 'source-map',

  entry: {
    'app': './src/main.ts',
    'vendor': './src/vendor.ts',
    'polyfills': './src/polyfills.ts',
  },

  output: {
    path: helpers.root('dist'),
    publicPath: DEVELOPMENT ? `http://${SERVER.host}:${SERVER.port}/` : '/dist/',
    filename: DEVELOPMENT ? '[name].js' : '[name].[hash].js',
    chunkFilename: DEVELOPMENT ? '[id].chunk.js' : '[id].[hash].chunk.js'
  },

  resolve: {
    extensions: ['.ts', '.js', 'json'],
    alias: {
      'phaser-ce': path.join(PHASER_DIR, 'build/custom/phaser-split.js'),
      'pixi': path.join(PHASER_DIR, 'build/custom/pixi.js'),
      'p2': path.join(PHASER_DIR, 'build/custom/p2.js')
    }
  },

  module: {
    rules: [{ // configuration of Phaser
      test: /pixi\.js/,
      loader: 'expose-loader?PIXI'
    }, {
      test: /phaser-split\.js$/,
      loader: 'expose-loader?Phaser' 
    }, {
      test: /p2\.js/,
      loader: 'expose-loader?p2'
    }, {
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
      }, 'angular-router-loader', 'angular2-template-loader']
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
        helpers.root('node_modules/font-awesome/fonts'),
        helpers.root('node_modules/katex/dist/fonts')
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

    // new webpack.NamedModulesPlugin(),
    // Scope Hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether'
    }),

    // 用于去掉浏览器console的warning
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), {}
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      // minChunks: 2
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
      template: 'src/index.html',
      chunksSortMode: 'dependency'
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
    // new UglifyJSPlugin({
    //   sourceMap: DEVELOPMENT,
    //   beautify: DEVELOPMENT, // 最紧凑的输出
    //   compress: {
    //     warnings: DEVELOPMENT,
    //     drop_debugger: DEVELOPMENT,
    //     screw_ie8: true
    //   },
    //   mangle: {
    //     // Skip mangling these
    //     except: ['$super', '$', 'exports', 'require'],
    //     screw_ie8: true,
    //     keep_fnames: true
    //   },
    //   comments: DEVELOPMENT
    // }),

    new ParallelUglifyPlugin({
      workerCount: os.cpus().length,
      cacheDir: '.cache/',
      uglifyJS: {
        compress: {
          warnings: DEVELOPMENT,
          drop_debugger: true,
          drop_console: true
        },
        comments: DEVELOPMENT,
        sourceMap: DEVELOPMENT,
        mangle: {
          // Skip mangling these
          except: ['$super', '$', 'exports', 'require'],
          screw_ie8: true,
          keep_fnames: true
        }
      }
    }),

    // 定义环境变量
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(PRODUCTION),
      DEVELOPMENT: JSON.stringify(DEVELOPMENT)
    }),

    // 实现文件顶部版权声明
    new webpack.BannerPlugin('Copyright www.honeymorning.com 2017 inc.')
  ],
  node: {
    console: false,
    global: true,
    process: true,
    Buffer: false,
    setImmediate: false,
    // fs: 'empty',
    // net: 'empty',
    // tls: 'empty'
  },
};
