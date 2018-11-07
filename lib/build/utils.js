var path = require('path')
var config = require('../config')

// 公共依赖
process.deps = { webpack: require.resolve('webpack') };

exports.assetsPath = function (_path) {
  return path.posix.join(config.build.assetsSubDirectory, _path)
}
