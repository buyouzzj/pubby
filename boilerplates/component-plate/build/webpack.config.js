var path = require('path');
var webpack = require('webpack');
var utils = require('./webpack.cssloader');

module.exports = {
  entry: {
    com: './index.js',
    test: './test/manual.test.js'
  },
  output: {
    path: './dist',
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        // include: path.join(__dirname, ''),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        // include: path.join(__dirname, ''),
        exclude: /node_modules/,
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
        exclude: /node_modules/,
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
        // },
      }
    ].concat(utils.styleLoaders())
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  stats: {
    // Nice colored output
    colors: true,
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map',
  vue: {
    loaders: utils.cssLoaders(),
    autoprefixer: {
      browsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }
  },
  stylelint: {
    ignoreCache: true,
  },
};
