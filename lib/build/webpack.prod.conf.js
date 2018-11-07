var path = require('path')
var projectRoot = process.cwd()
var pkg = require(projectRoot + '/package.json')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var autoprefixer = require('autoprefixer')
var glob = require('glob')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlCallback = require('./html-plugin-callback')
var assetsLoader = require('./modules/assets').prod
var StylePathUtil = require('./modules/style-path-util');
var getCustomConfig = require('../utils/custom-config');
var newFeature = require('../new-feature');
var env = config.build.env

var argv = require('yargs').argv
var tmpdir = require('os').tmpdir;
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

/**
 * 控制版本信息
 */
var pkgVersion = pkg.version;
// 开发环境上传时，版本号统一为1.0.0
if (argv.baseVersion) {
  pkgVersion = '1.0.0';
}
// 生产编译不带版本号，cdn自动加
if (argv.prod) {
  pkgVersion = '';
}

/**
 * html模板
 */
var templates = require('./modules/template');

/**
 * 生产配置文件
 */
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: assetsLoader,
  },
  devtool: '#cheap-module-source-map', // config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(pkgVersion + '/' + 'js/[name].min.js'), // chunk hash不需要 [chunkhash]
    chunkFilename: utils.assetsPath(pkgVersion + '/' + 'js/chunks/[name].min.js') // [id][chunkhash]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9', 'iOS >= 8', 'Android >= 4'],
    })
  ],
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new ParallelUglifyPlugin({
      cacheDir: tmpdir(),
      uglifyJS: {
        compress: {
          warnings: false,
          drop_console: true
        },
      },
      // sourceMap: true
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: true,
    //     unused: false
    //   }
    // }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath(pkgVersion + '/' + 'css/[name].min.css')), // contenthash不需要 [contenthash]
  ].concat(templates()).concat([
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin

    new HtmlCallback(),

    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          (/\.js(x?)$/.test(module.resource) || /\.vue$/.test(module.resource)) &&
          (
            module.resource.indexOf(path.join(projectRoot, './node_modules')) === 0 ||
            module.resource.indexOf(path.join(projectRoot, './src/components/common')) === 0 ||
            module.resource.indexOf(path.join(projectRoot, './src/utils')) === 0
          )
        )
      }
    }),
    // 替换css的图片与资源引用为相对路径
    new StylePathUtil(),
  ]).concat(newFeature.manifestChunk)
}, getCustomConfig('PROD'))

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
