var config = require('../config');
var webpack = require('webpack');
var merge = require('webpack-merge');
var autoprefixer = require('autoprefixer');
var utils = require('./utils');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var assetsLoader = require('./modules/assets').dev;
var mobileConsolePlugin = require('../plugins/mobile-console');
var templates = require('./modules/template');
var projectRoot = process.cwd();
var pkg = require(projectRoot + '/package.json');
var getCustomConfig = require('../utils/custom-config');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [__dirname + '/dev-client', __dirname + '/../../node_modules/webpack/hot/dev-server'].concat(baseWebpackConfig.entry[name])
})

var sourceMapSetting = '#cheap-module-source-map';
if (process.env.cube_fast) sourceMapSetting = '';
if (process.env.cube_eval) sourceMapSetting = '#cheap-module-eval-source-map';

var autoprefixerSetting = ['last 2 versions'];
if (pkg.cube.type === 'react-mobile-project') {
  autoprefixerSetting = ['iOS >= 7', 'Android >= 4'];
}

module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  module: {
    loaders: assetsLoader,
  },
  // 定义输出
  output: {
    path: config.dev.assetsRoot,
    publicPath: config.dev.assetsPublicPath,
    filename: 'js/[name].min.js'
  },
  devtool: sourceMapSetting,
  postcss: pkg.cube.type !== 'react-mobile-project' ? [] : [ autoprefixer({ browsers: autoprefixerSetting }) ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // mobile console support
    new mobileConsolePlugin({ enable: pkg.cube.type === 'react-mobile-project' })
    // https://github.com/ampedandwired/html-webpack-plugin
  ].concat(templates()),
}, getCustomConfig('DEV'))
