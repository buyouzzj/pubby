const projectRoot = process.cwd();
const pkg = require(projectRoot + '/package.json');
const path = require('path');
const glob = require('glob');

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

// 遍历js，获取所有入口
module.exports = function getEntries(globPath) {
  var files = glob.sync(globPath);
  var entries = {}, entry, dirname, basename;
  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    var basename = dirname.match(/entries\/\w*$/g);
    if (basename) {
      basename = basename[0].replace('entries/','');
      if (!entries[basename]) {
        // dev模式下，如果配置了default_entry，则仅留一个入口，不打包其他入口
        if (env === 'dev' && pkg.cube.default_entry && pkg.cube.default_entry !== 'index') {
          const entryName = pkg.cube.default_entry.toLowerCase();
          if (entryName === basename) {
            entries[basename] = entry;
          }
        } else {
          // 不是dev模式，或default_entry配置项不存在，entry不作处理
          entries[basename] = entry;
        }
      } else {
        throw new Error('src/entries/' + basename + ' 目录下有多个入口文件，请检查！');
      }
    }
  }
  return entries;
}
