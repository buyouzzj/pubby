var path = require('path')
var glob = require('glob')
var webpack = require('webpack')
var fs = require('fs')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

function getEntries(globPath) {
  var files = glob.sync(globPath);
  var entries = {}, entry, dirname, basename;
  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    basename = path.basename(entry, '.js');
    entries[basename] = entry;
  }
  return entries;
}

module.exports = {
  entry: getEntries('./src/_entries/*.js'),
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
        // exclude: function(p) {
        //   if (p.match(/node_modules/)) {
        //     if (p.match(/alipay/)) {
        //       return false;
        //     } else {
        //       return true;
        //     }
        //   } else {
        //     return false;
        //   }
        // }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]') // [hash:7]
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]') // [hash:7]
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  stylelint: {
    ignoreCache: true
  },
  vue: {
    loaders: utils.cssLoaders(),
    autoprefixer: {
      browsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }
  }
}
