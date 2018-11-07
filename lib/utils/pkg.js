var fs = require('fs');
var pkgUrl = process.cwd() + '/package.json';
var pkg = require(pkgUrl);

module.exports = {
  get: function(key, shouldReload) {
    var p = pkg;
    if (shouldReload) {
      p = this.content();
    }
    return p[key];
  },
  content: function () {
    return JSON.parse(fs.readFileSync(pkgUrl, 'utf-8'));
  }
}
