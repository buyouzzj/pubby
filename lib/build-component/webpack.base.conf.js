var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var autoprefixer = require('autoprefixer');
var config = require('../config');
var utils = require('../build/utils');
var projectRoot = process.cwd();

var ProgressBarPlugin = require('../plugins/progress-bar');

// 加载各模块配置
var babelConfig = require('../build/modules/babel');

const port = process.env.cube_port || config.dev.port;

module.exports = {
  // 定义入口
  entry: { dev: path.join(projectRoot, './static/_dev.js') },
  // 定义输出
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  // 定义别名，减少相对路径层级较多时引用不便的问题
  resolve: {
    extensions: ['', '.js', '.jsx'], // 无须扩展名的文件类型
    fallback: [path.join(projectRoot, './node_modules')],
    alias: {
      'src': path.resolve(projectRoot, './src'),
      'hotMiddleware': path.join(require.resolve('webpack-hot-middleware'), '../client') + '?reload=true&path=http://localhost:' + port + '/__webpack_hmr',
    }
  },
  // loader在命令行中
  resolveLoader: {
    fallback: [path.join(__dirname, '../../node_modules')]
  },
  // 引用loader
  module: {
    preLoaders: [
      {
        test: /\.js(x?)$/,
        loader: 'eslint-loader',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: babelConfig,
      },
      {
        test: /\.jsx$/,
        loader: 'babel',
        query: babelConfig,
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  // babel配置
  babel: babelConfig,
  // eslint配置
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  // stylelint配置
  stylelint: {
    ignoreCache: true
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    })
  ],
  plugins: [
    new ProgressBarPlugin(webpack),
  ],
}
