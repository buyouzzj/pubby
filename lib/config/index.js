var path = require('path');
var projectRoot = process.cwd();

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(projectRoot, './dist/'),
    assetsRoot: path.resolve(projectRoot, './dist/'),
    assetsSubDirectory: '',
    assetsPublicPath: '',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 9090,
    proxyTable: {},
    assetsRoot: path.resolve(projectRoot, './dist/'),
    assetsSubDirectory: '',
    assetsPublicPath: '/'
  }
}
