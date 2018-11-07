var fs = require('fs');
var path = require('path');
var configUrl = path.join(process.cwd(), './webpack.config.js');

module.exports = function(environment) {
  try {
    var configExists = fs.statSync(configUrl);
    var config = require(configUrl);

    var currentConfig = config[environment.toLowerCase()] || {};
    var commonConfig = config.common || {};

    return Object.assign({}, commonConfig, currentConfig);
  } catch(e) {
    return {};
  }
}
