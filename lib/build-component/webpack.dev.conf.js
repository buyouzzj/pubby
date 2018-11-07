var config = require('../config');
var webpack = require('webpack');
var merge = require('webpack-merge');
var utils = require('../build/utils');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var assetsLoader = require('../build/modules/assets').dev;
var getCustomConfig = require('../utils/custom-config');
var projectRoot = process.cwd();

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [__dirname + '/../build/dev-client', __dirname + '/../../node_modules/webpack/hot/dev-server'].concat(baseWebpackConfig.entry[name])
})

var sourceMapSetting = '#cheap-module-source-map';
if (process.env.cube_fast) sourceMapSetting = '';
if (process.env.cube_eval) sourceMapSetting = '#cheap-module-eval-source-map';

module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  module: { loaders: assetsLoader },
  // 定义输出
  output: {
    path: config.dev.assetsRoot,
    publicPath: config.dev.assetsPublicPath,
    filename: 'js/[name].min.js'
  },
  devtool: sourceMapSetting,
  plugins: [
    new webpack.DefinePlugin({ 'process.env': config.dev.env }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      inject: true,
    }),
  ],
}, getCustomConfig('DEV'))
