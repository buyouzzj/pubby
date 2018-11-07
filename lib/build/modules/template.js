const projectRoot = process.cwd();
const pkg = require(projectRoot + '/package.json');
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');

const entryConfig = require('./entry')(projectRoot + '/src/entries/**/*.js');

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

/**
 * 获取静态模板路径
 */
function getHtmlPath(viewname) {
  return projectRoot + '/screen/' + viewname;
}

function generateHtmlConfig(viewname) {
  const name = viewname.split('.html')[0];

  // 单页应用特殊处理
  var filename = viewname;
  if (viewname === 'app.html') {
    filename = 'index.html';
  }

  // 判断是否dev单入口模式
  const isSingle = env === 'dev' && pkg.cube.default_entry && pkg.cube.default_entry !== 'index';

  const htmlConfig = {
    filename: isSingle ? 'index.html' : filename,
    template: getHtmlPath(filename),
    inject: true,
    chunks: [name],
    hash: true,
  };

  if (env === 'prod') {
    htmlConfig.minify = {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    };
    htmlConfig.filename = '../' + pkg.cube.vm_path + '/' + name + '.vm';
    htmlConfig.chunksSortMode = 'dependency';  // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    htmlConfig.chunks = ['vendor', 'manifest', name];
  }
  return new HtmlWebpackPlugin(htmlConfig);
}

module.exports = function () {
  var templateConfig = [];
  /**
   * 编码配置
   */
  if (env === 'prod' && pkg.cube.encoding && pkg.cube.encoding != 'utf-8') {
    templateConfig.push(new EncodingPlugin(pkg.cube.encoding));
  }
  /**
   * 编译vm模板配置
   */
  var files = entryConfig;
  for (var i in files) {
    templateConfig.push(generateHtmlConfig(i + '.html'));
  }
  return templateConfig;
}
