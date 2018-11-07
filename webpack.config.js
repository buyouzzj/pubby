var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    com: './index.js',
    test: './test/manual.test.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: path.join(__dirname, ''),
        exclude: /node_modules/,
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, ''),
        exclude: /node_modules/,
      }
    ]
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
};
