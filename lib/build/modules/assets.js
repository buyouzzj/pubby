const moduleConfig = '&modules&localIdentName=[local]___[hash:base64:5]';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const projectRoot = process.cwd();
const pkg = require(projectRoot + '/package.json');
const argv = require('yargs').argv;
const utils = require('../utils');

/**
 * 控制版本信息
 */
var pkgVersion = argv.baseVersion ? '1.0.0' : pkg.version;
// 生产编译不带版本号，cdn自动加
if (argv.prod) {
  pkgVersion = '';
}

const cssDevConfig = (
  'style-loader?singleton!' + // insert to dom
  // 'stylelint!' +
  'css?sourceMap&-autoprefixer!' +
  'postcss-loader!' +
  'sass'
);

const cssProdConfig = (
  // 'stylelint!' +
  'css?minimize&-autoprefixer!' +
  'postcss-loader!' +
  'sass'
);

module.exports = {
  dev: [
    {
      test: /\.(s?)css$/,
      loader: cssDevConfig,
    },
    {
      test: /\.less$/,
      loader: cssDevConfig + '!less',
    },
    {
      test: /\.scss$/,
      loader: 'stylelint',
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: require.resolve('url-loader'),
      query: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[ext]') // [hash:7]
      },
      exclude: /antd\-mobile/,
    },
    {
      test: /\.svg$/,
      loader: 'svg-sprite',
  	  include: /antd\-mobile/,
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: utils.assetsPath('font/[name].[ext]') // [hash:7]
      }
    }
  ],
  prod: [
    {
      test: /\.(s?)css$/,
      loader: ExtractTextPlugin.extract(cssProdConfig),
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(cssProdConfig + '!less'),
    },
    {
      test: /\.scss$/,
      loader: 'stylelint',
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: require.resolve('url-loader'),
      query: {
        limit: 10000,
        name: utils.assetsPath(pkgVersion + '/' + 'img/[name].[ext]') // [hash:7]
      },
      exclude: /antd\-mobile/,
    },
    {
      test: /\.svg$/,
      loader: 'svg-sprite',
  	  include: /antd\-mobile/,
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: utils.assetsPath(pkgVersion + '/' + 'font/[name].[ext]') // [hash:7]
      }
    }
  ]
};
