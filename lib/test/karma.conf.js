var path = require('path');
var projectRoot = process.cwd();
var cssLoader = require('../build/modules/css').dev;

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true, //just run once by default
    frameworks: [ 'mocha', 'sinon-chai' ], //use the mocha test framework
    files: [
      './index.js' //just load this file
    ],
    preprocessors: {
      './index.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    plugins: [
      "karma-coverage",
      "karma-phantomjs-launcher",
      "karma-mocha",
      "karma-sinon-chai",
      "karma-sourcemap-loader",
      "karma-webpack"
    ],
    reporters: [ 'dots' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      // loader在命令行中
      resolveLoader: {
        fallback: [path.join(__dirname, '../../node_modules')]
      },
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          { test: /\.js(x?)$/, loader: 'babel', exclude: /node_modules/ },
          { test: /\.json$/, loader: 'json', exclude: /node_modules/ },
        ].concat(cssLoader),
      }
    },
    webpackMiddleware: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};

// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

// var path = require('path')
// var merge = require('webpack-merge')
// var baseConfig = require('../build/webpack.base.conf')
// var webpack = require('webpack')
// var projectRoot = process.cwd()
// var cssLoader = require('../build/modules/css').dev
//
// var webpackConfig = merge(baseConfig, {
//   // use inline sourcemap for karma-sourcemap-loader
//   module: {
//     loaders: cssLoader
//   },
//   devtool: '#inline-source-map',
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': 'testing'
//     })
//   ]
// })
//
// // no need for app entry during tests
// delete webpackConfig.entry
//
// // make sure isparta loader is applied before eslint
// webpackConfig.module.preLoaders = webpackConfig.module.preLoaders || []
// webpackConfig.module.preLoaders.unshift({
//   test: /\.js(x?)$/,
//   loader: 'isparta',
//   include: path.resolve(projectRoot, 'src')
// })
//
// // only apply babel for test files when using isparta
// webpackConfig.module.loaders.some(function (loader, i) {
//   if (loader.loader === 'babel') {
//     loader.include = path.resolve(projectRoot, 'test/unit')
//     return true
//   }
// })
//
// module.exports = function (config) {
//   config.set({
//     // to run in additional browsers:
//     // 1. install corresponding karma launcher
//     //    http://karma-runner.github.io/0.13/config/browsers.html
//     // 2. add it to the `browsers` array below.
//     browsers: ['PhantomJS'],
//     frameworks: ['mocha', 'sinon-chai'],
//     reporters: ['spec', 'coverage'],
//     files: ['./index.js'],
//     preprocessors: {
//       './index.js': ['webpack', 'sourcemap']
//     },
//     plugins: [
//       "karma-coverage",
//       "karma-mocha",
//       "karma-phantomjs-launcher",
//       "karma-sinon-chai",
//       "karma-sourcemap-loader",
//       "karma-spec-reporter",
//       "karma-webpack"
//     ],
//     webpack: webpackConfig,
//     webpackMiddleware: {
//       noInfo: true
//     },
//     coverageReporter: {
//       dir: './coverage',
//       reporters: [
//         { type: 'lcov', subdir: '.' },
//         { type: 'text-summary' }
//       ]
//     }
//   })
// }
