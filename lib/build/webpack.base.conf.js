var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var config = require('../config');
var utils = require('./utils');
var projectRoot = process.cwd();

var ProgressBarPlugin = require('../plugins/progress-bar');
var createHappyPlugin = require('../plugins/happy-pack');
var newFeature = require('../new-feature');

// 加载各模块配置
var babelConfig = require('./modules/babel');
var entryConfig = require('./modules/entry')(projectRoot + '/src/entries/**/*.js');

// hot-reload插件配置
const isDev = process.argv[1].match('dev-server');
if (isDev) {
  babelConfig.presets.push(require.resolve('babel-preset-react-hmre'));
}

const port = process.env.cube_port || config.dev.port;

const webpackConfig = {
  cache: true,
  // profile: true,
  // 定义入口
  entry: entryConfig,
  externals: newFeature.externals,
  // 定义输出
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: 'js/[name].min.js'
  },
  // 定义别名，减少相对路径层级较多时引用不便的问题
  resolve: {
    extensions: ['', '.web.js', '.js', '.jsx'], // 无须扩展名的文件类型
    fallback: [path.join(projectRoot, './node_modules')],
    alias: {
      'src': path.resolve(projectRoot, './src'),
      'assets': path.resolve(projectRoot, './src/assets'),
      'components': path.resolve(projectRoot, './src/components'),
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
        loader: 'happypack/loader?id=eslint',
        // loader: 'eslint-loader',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js(x?)$/,
        loader: 'happypack/loader?id=js',
        // loader: 'babel',
        // query: babelConfig,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'happypack/loader?id=json',
        // loader: 'json',
        exclude: /node_modules/
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
  plugins: [
    createHappyPlugin('js', [{ path: 'babel', query: babelConfig }]),
    createHappyPlugin('eslint', ['eslint-loader']),
    createHappyPlugin('json', ['json']),
    new ProgressBarPlugin(webpack)
  ],
}

// pxtorem适配
var pkg = require(projectRoot + '/package.json');
var pxtorem = require('postcss-pxtorem');
if (pkg.cube.type === 'react-mobile-project') {
  webpackConfig.postcss = [
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
      minPixelValue: 3
    })
  ];
}

module.exports = webpackConfig;
