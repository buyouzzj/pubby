const pkg = require('../package.json');
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

/**
 * 获取静态模板路径
 */
function getHtmlPath(viewname) {
  return './screen/' + viewname;
}

function generateHtmlConfig(viewname) {
  const name = viewname.split('.html')[0];

  // 单页应用特殊处理
  var filename = viewname;
  if (viewname === 'app.html') {
    filename = 'index.html';
  }

  const htmlConfig = {
    filename: filename,
    template: getHtmlPath(filename),
    inject: true,
    chunks: [name],
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

    // 单页应用特殊处理
    if (viewname === 'app.html') {
      htmlConfig.filename = '../' + pkg.cube.vm_path + '/' + 'index.vm';
    }

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
  var files = glob.sync('./src/_entries/*.js');
  files.forEach((file) => {
    templateConfig.push(generateHtmlConfig(file.split('_entries/')[1].replace('.js', '.html')));
  });
  // var files = glob.sync('./screen/*.html');
  // files.forEach((file) => {
  //   templateConfig.push(generateHtmlConfig(file.split('screen/')[1]));
  // });
  return templateConfig;
}
