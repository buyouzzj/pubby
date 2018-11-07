var pkg = require('../package.json');

// cube蜻蜓静态文件代理
module.exports = function(rules) {
  var testDomain = 'GET //as.test.alipay.net/*';
  var devDomain = 'GET //dsj.assets.alipay.net/*';
  var prodDomain = 'GET //as.alipayobjects.com/*';
  var prodDomain2 = 'GET //a.alipayobjects.com/*';
  rules[testDomain] = 'http://localhost:8001';
  rules[devDomain] = 'http://localhost:8001';
  rules[prodDomain] = 'http://localhost:8001';
  rules[prodDomain2] = 'http://localhost:8001';

  var resURIBaseVersion = 'GET /' + pkg.cube.domain + pkg.name.replace('@alipay/','') + '/1.0.0/(.*)';
  var resURI = 'GET /' + pkg.cube.domain + pkg.name.replace('@alipay/','') + '/' + pkg.version + '/(.*)';
  rules[resURIBaseVersion] = 'http://localhost:9090';
  rules[resURI] = 'http://localhost:9090';

  return rules;
}
