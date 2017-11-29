const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
  devtool: DEVELOPMENT ? 'eval-source-map' : 'source-map',

  entry: {
    'app': './src/main.ts',
    'vendor': './src/vendor.ts',
    'polyfills': './src/polyfills.ts',
  },

  output: {
    path: helpers.root('dist'),
    publicPath: DEVELOPMENT ? `http://${SERVER.host}:${SERVER.port}/` : '',
    filename: DEVELOPMENT ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: DEVELOPMENT ? '[id].chunk.js' : '[id].[chunkhash].chunk.js'
  },

  resolve: {
    extensions: ['.ts', '.js', 'json'],
    alias: {
      'phaser-ce': path.join(PHASER_DIR, 'build/custom/phaser-split.js'),
      'pixi': path.join(PHASER_DIR, 'build/custom/pixi.js'),
      'p2': path.join(PHASER_DIR, 'build/custom/p2.js')
    }
  },

  externals: {
    'CKEDITOR': {
      commonjs: 'CKEDITOR',
      amd: 'CKEDITOR',
      root: 'CKEDITOR'
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
          configFileName: helpers.root('src/tsconfig.json')
        }
      }, 'angular-router-loader?debug=false', 'angular2-template-loader']
    }, {
      test: /\.html$/,
      loader: 'html-loader',
      include: [
        helpers.root('src')
      ]
    }, {
      test: /\.(png|jpe?g|gif|ico|svg)$/,
      use: DEVELOPMENT ?
        'url-loader?limit=50000&name=src/assets/images/[name].[hash].[ext]' : 'url-loader?limit=50000&name=src/assets/images/[name].[hash].[ext]&publicPath=/',
      include: [helpers.root('src/assets/images')]
    }, {
      test: /\.(ttf|eot|woff|woff2|svg)([\w\?=\.]*)?$/,
      use: DEVELOPMENT ?
        'file-loader?name=fonts/[name].[hash].[ext]' : 'file-loader?name=fonts/[name].[hash].[ext]&publicPath=/',
      include: [
        helpers.root('src/assets/font'),
        helpers.root('node_modules/font-awesome/fonts'),
        helpers.root('node_modules/bootstrap/dist/fonts')
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
      exclude: [
        helpers.root('src', 'app'),
        helpers.root('src/assets/css')
      ],
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
      include: [
        helpers.root('src', 'app'),
      ],
      use: [
        'raw-loader'
      ]
    }]
  },

  plugins: [
    // Scope Hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery',
      Popper: ['popper.js', 'default'],
      'window.Popper': ['popper.js', 'default']
    }),

    // 用于去掉浏览器console的warning
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), {}
    ),

    new CopyWebpackPlugin([{
      from: helpers.root('/src/assets/images'),
      to: helpers.root('/dist/assets/images'),
      toType: 'dir'
    }, {
      from: helpers.root('/src/assets/lib'),
      to: helpers.root('/dist/assets/lib'),
      toType: 'dir'
    }, {
      from: helpers.root('/src/assets/localdb'),
      to: helpers.root('/dist/assets/localdb'),
      toType: 'dir'
    }, {
      from: helpers.root('/dll'),
      to: helpers.root('/dist/dll'),
      toType: 'dir'
    }, {
      from: helpers.root('/src/assets/css'),
      to: helpers.root('/dist/src/assets/css'),
      toType: 'dir'
    }], {
      ignore: [
        '*.scss',
        '**/font/*'
      ]
    }),

    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['manifest'],
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
      // chunksSortMode: 'dependency'
      chunksSortMode: function(chunk1, chunk2) {
        const orders = ['manifest', 'vendor', 'polyfills', 'app'];
        var order1 = orders.indexOf(chunk1.names[0]);
        var order2 = orders.indexOf(chunk2.names[0]);
        if (order1 > order2) {
          return 1;
        } else if (order1 < order2) {
          return -1;
        } else {
          return 0;
        }
      }
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

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(helpers.root('dll/vendor-manifest.json'))
    }),

    new ParallelUglifyPlugin({
      workerCount: os.cpus().length,
      cacheDir: '.cache/',
      sourceMap: DEVELOPMENT,
      uglifyJS: {
        compress: {
          warnings: DEVELOPMENT,
          drop_debugger: PRODUCTION,
          drop_console: PRODUCTION
        },
        // comments: DEVELOPMENT,
        mangle: {
          // Skip mangling these
          reserved: ['$super', '$', 'exports', 'require'],
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
    console: DEVELOPMENT,
    global: true,
    process: true,
    Buffer: false,
    setImmediate: false,
    // fs: 'empty',
    // net: 'empty',
    // tls: 'empty'
  },
};
