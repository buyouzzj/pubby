const argv = require('yargs').argv;
const projectRoot = process.cwd();
const pkg = require(projectRoot + '/package.json');
const cdnUrl = require('./modules/cdnUrl');

// --prod时，cdn服务器编译不带版本号，因此加版本号
const url = cdnUrl.prod + pkg.cube.domain + pkg.name + (argv.prod ? '/' + pkg.version : '');

function HtmlCallback(options) {
  // Configure your plugin with options...
}

HtmlCallback.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {
      htmlPluginData.html = htmlPluginData.html
      .replace('<link href=dev.css rel=stylesheet>', '')
      .replace(/src=/g, 'src=' + url)
      .replace(/href=/g, 'href=' + url);
      callback(null, htmlPluginData);
    });
  });
};

module.exports = HtmlCallback;
