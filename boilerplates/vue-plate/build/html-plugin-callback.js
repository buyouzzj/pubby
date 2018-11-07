const argv = require('yargs').argv;
const pkg = require('../package.json');

// --prod时，cdn服务器编译不带版本号，因此加版本号
const url = '//as.alipayobjects.com/' + pkg.cube.domain + pkg.name + (argv.prod ? '/' + pkg.version : '');

function HtmlCallback(options) {
  // Configure your plugin with options...
}

HtmlCallback.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {
      htmlPluginData.html = htmlPluginData.html
      // .replace('<body>','').replace('</body>','')
      // .replace('<head>','').replace('</head>','')
      .replace(/src=/g, 'src=' + url)
      .replace(/href=/g, 'href=' + url)
      callback(null, htmlPluginData);
    });
  });
};

module.exports = HtmlCallback;
