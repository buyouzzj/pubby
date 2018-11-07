var shelljs = require('shelljs');
var fs = require('fs');
var path = require('path');
var iconv = require('iconv-lite');
var projectRoot = process.cwd()
var pkg = require(projectRoot + '/package.json')

var argv = require('yargs').argv;
var pkgVersion = argv.baseVersion ? '1.0.0' : pkg.version;
var pkgEncoding = pkg.cube.encoding;

function readFileList() {
  var dirFullName = projectRoot + (argv.prod ? '/dist/css/' : '/dist/' + pkgVersion + '/css/');
  var readDir = fs.readdirSync(dirFullName);
  if (readDir) {
    readDir.forEach((key) => {
      var fileName = dirFullName + key;
      var contentText = fs.readFileSync(fileName);
      contentText = iconv.decode(contentText, pkgEncoding !== 'utf-8' ? 'utf-8' : pkgEncoding);
      var result = replacePath(contentText);
      if (pkgEncoding !== 'utf-8') {
        result = iconv.encode(result, pkgEncoding);
      }
      fs.writeFileSync(fileName, result);
    });
  }
}

function replacePath(content) {
  var result;
  // 生产编译不带版本号，cdn自动加
  if (argv.prod) {
    var con = new RegExp('url\\(/(?!/)', 'gi');
    // console.log(content.match(con));
    result = content.replace(con, 'url(../');
  } else {
    var con = new RegExp(('url\\(' + pkgVersion + '/').split('.').join('\\\.'), 'gi');
    // console.log(content.match(con));
    result = content.replace(con, 'url(../');
  }
  return result;
}

// main process
function StylePathUtil(options) {}
StylePathUtil.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    readFileList();
    // 顺便做一下 _assets 复制
    if (!argv.baseVersion) {
      shelljs.mkdir('-p', path.join(process.cwd(), '/_assets'));
      shelljs.cp('-rf', path.join(process.cwd(), '/dist/*'), path.join(process.cwd(), '/_assets'));
      const ts = new Date().getTime();
      fs.writeFileSync(path.join(process.cwd(), '/_assets/.build-info'), ts);
    }
  });
};

module.exports = StylePathUtil;
