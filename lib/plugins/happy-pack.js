var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: 4 });

module.exports = function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verbose: false,
    cache: true,
  });
}
