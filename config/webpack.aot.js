const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');

const { NoEmitOnErrorsPlugin, EnvironmentPlugin, HashedModuleIdsPlugin, ProvidePlugin } = require('webpack');
const { BaseHrefWebpackPlugin, SuppressExtractedTextChunksWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin, ModuleConcatenationPlugin } = require('webpack').optimize;
// const { LicenseWebpackPlugin } = require('license-webpack-plugin');
const { PurifyPlugin } = require('@angular-devkit/build-optimizer');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ['inline', 'polyfills', 'sw-register', 'styles', 'vendor', 'main'];
const minimizeCss = true;
const baseHref = '';
const deployUrl = '';
const postcssPlugins = function() {
  // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
  const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
  const minimizeOptions = {
    autoprefixer: false,
    safe: true,
    mergeLonghand: false,
    discardComments: { remove: comment => !importantCommentRe.test(comment) }
  };
  return [
    postcssUrl({
      url: URL => {
        const { url } = URL;
        // Only convert root relative URLs, which CSS-Loader won't process into require().
        if (!url.startsWith('/') || url.startsWith('//')) {
          return URL.url;
        }
        if (deployUrl.match(/:\/\//)) {
          // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
          return `${deployUrl.replace(/\/$/, '')}${url}`;
        } else if (baseHref.match(/:\/\//)) {
          // If baseHref contains a scheme, include it as is.
          return baseHref.replace(/\/$/, '') + `/${deployUrl}/${url}`.replace(/\/\/+/g, '/');
        } else {
          // Join together base-href, deploy-url and the original URL.
          // Also dedupe multiple slashes into single ones.
          return `/${baseHref}/${deployUrl}/${url}`.replace(/\/\/+/g, '/');
        }
      }
    }),
    autoprefixer(),
    customProperties({ preserve: true })
  ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};

const PHASER_DIR = path.join(process.cwd(), 'node_modules/phaser-ce');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['./node_modules', './node_modules'],
    symlinks: true,
    alias: Object.assign({}, rxPaths(), {
      'phaser-ce': path.join(PHASER_DIR, 'build/custom/phaser-split.js'),
      'pixi': path.join(PHASER_DIR, 'build/custom/pixi.js'),
      'p2': path.join(PHASER_DIR, 'build/custom/p2.js')
    }),
    mainFields: ['browser', 'module', 'main']
  },
  resolveLoader: {
    modules: ['./node_modules', './node_modules'],
    alias: rxPaths()
  },
  entry: {
    main: ['./src/main.ts'],
    polyfills: ['./src/polyfills.ts'],
    vendor: ['./src/vendor.ts']
    // styles: ['./src/styles.css']
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].[chunkhash:20].bundle.js',
    chunkFilename: '[id].[chunkhash:20].chunk.js',
    crossOriginLoading: false
  },
  module: {
    rules: [
      {
        // configuration of Phaser
        test: /pixi\.js/,
        loader: 'expose-loader?PIXI'
      },
      {
        test: /phaser-split\.js$/,
        loader: 'expose-loader?Phaser'
      },
      {
        test: /p2\.js/,
        loader: 'expose-loader?p2'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(eot|svg|cur)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:20].[ext]',
          limit: 10000
        }
      },
      {
        test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[hash:20].[ext]',
          limit: 10000
        }
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        include: [path.join(process.cwd(), 'src/app')],
        test: /\.css$/,
        use: [
          'exports-loader?module.exports.toString()',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postcssPlugins,
              sourceMap: false
            }
          }
        ]
      },
      {
        include: [path.join(process.cwd(), 'src/app')],
        test: /\.scss$|\.sass$/,
        use: [
          'exports-loader?module.exports.toString()',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postcssPlugins,
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              precision: 8,
              includePaths: []
            }
          }
        ]
      },
      {
        exclude: [path.join(process.cwd(), 'src/app')],
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: postcssPlugins,
                sourceMap: false
              }
            }
          ],
          publicPath: ''
        })
      },
      {
        exclude: [path.join(process.cwd(), 'src/app')],
        test: /\.scss$|\.sass$/,
        loaders: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: postcssPlugins,
                sourceMap: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                precision: 8,
                includePaths: []
              }
            }
          ],
          publicPath: ''
        })
      },
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: [
          {
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: {
              sourceMap: false
            }
          },
          '@ngtools/webpack'
        ]
      }
    ]
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([{
      from: path.join(process.cwd(), '/src/assets/images'),
      to: path.join(process.cwd(), '/dist/assets/images'),
      toType: 'dir'
    }, {
      from: path.join(process.cwd(), '/src/assets/lib'),
      to: path.join(process.cwd(), '/dist/assets/lib'),
      toType: 'dir'
    }, {
      from: path.join(process.cwd(), '/src/assets/localdb'),
      to: path.join(process.cwd(), '/dist/assets/localdb'),
      toType: 'dir'
    }, {
      from: path.join(process.cwd(), '/dll'),
      to: path.join(process.cwd(), '/dist/dll'),
      toType: 'dir'
    }, {
      from: path.join(process.cwd(), '/src/assets/css'),
      to: path.join(process.cwd(), '/dist/src/assets/css'),
      toType: 'dir'
    }], {
      ignore: [
        '*.scss',
        '**/font/*'
      ]
    }),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      exclude: /(\\|\/)node_modules(\\|\/)/,
      failOnError: false
    }),
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery',
      Popper: ['popper.js', 'default'],
      'window.Popper': ['popper.js', 'default']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: {
        caseSensitive: true,
        collapseWhitespace: true,
        keepClosingSlash: true
      },
      cache: true,
      showErrors: true,
      chunks: 'all',
      excludeChunks: [],
      title: 'Webpack App',
      xhtml: true,
      chunksSortMode: function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
          return 1;
        } else if (leftIndex < rightindex) {
          return -1;
        } else {
          return 0;
        }
      }
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      name: ['inline'],
      minChunks: null
    }),
    new CommonsChunkPlugin({
      name: ['main'],
      minChunks: 2,
      async: 'common'
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:20].bundle.css'
    }),
    new SuppressExtractedTextChunksWebpackPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new HashedModuleIdsPlugin({
      hashFunction: 'md5',
      hashDigest: 'base64',
      hashDigestLength: 4
    }),
    new ModuleConcatenationPlugin({}),
    // new LicenseWebpackPlugin({
    //   licenseFilenames: ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'license', 'license.md', 'license.txt'],
    //   perChunkOutput: false,
    //   outputTemplate: '/home/taylorpzreal/Workspace/ng-api-front/node_modules/license-webpack-plugin/output.template.ejs',
    //   outputFilename: '3rdpartylicenses.txt',
    //   suppressErrors: true,
    //   includePackagesWithoutLicense: false,
    //   abortOnUnacceptableLicense: false,
    //   addBanner: false,
    //   bannerTemplate: '/*! 3rd party license information is available at <%- filename %> */',
    //   includedChunks: [],
    //   excludedChunks: [],
    //   additionalPackages: [],
    //   pattern: /^(MIT|ISC|BSD.*)$/
    // }),
    new PurifyPlugin(),
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
    new AngularCompilerPlugin({
      mainPath: 'main.ts',
      platform: 0,
      hostReplacementPaths: {
        'environments/environment.ts': 'environments/environment.prod.ts'
      },
      sourceMap: false,
      tsConfigPath: 'src/tsconfig.app.json',
      compilerOptions: {}
    })
  ],
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  devServer: {
    historyApiFallback: true
  }
};
