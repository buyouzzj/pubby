var projectRoot = process.cwd();
var path = require('path');
var pkg = require(projectRoot + '/package.json');
var isReact = pkg.cube && pkg.cube.type.indexOf('react') > -1 && pkg.cube.type.indexOf('project') > -1;
var isReactComponent = pkg.cube && pkg.cube.type === 'react-component';

var dirAlias = isReact ? __dirname + '/build' : isReactComponent ? __dirname + '/build-component' : '';

// 设置环境变量
var params = process.argv.slice(2);
params.forEach((el, index) => {
  if (el.indexOf('--') === 0) {
    var code = el.replace('--', '');
    var next = params[index + 1];
    if (!next || next.indexOf('--') === 0) {
      process.env['cube_' + code] = true;
      return;
    }
    process.env['cube_' + code] = next;
  }
});

// 加载proxyTable
if (pkg.cube.proxy) process.env['cube_proxy'] = JSON.stringify(pkg.cube.proxy);

module.exports = {
  lint: isReact || isReactComponent ? 'node "' + path.join(projectRoot, 'node_modules/eslint/bin/eslint.js') + '"' + ' --ext .js,.jsx src __test__' : 'npm run lint',
  build: isReact || isReactComponent ? 'node ' + '"' + dirAlias + '/build.js' + '"' : 'npm run build',
  buildProd: isReact || isReactComponent ? 'node ' + '"' + dirAlias + '/build.js' + '"' + ' --prod' : 'npm run build',
  buildBaseVersion: isReact || isReactComponent ? 'node ' + '"' + dirAlias + '/build.js' + '"' + ' --baseVersion': 'npm run build --baseVersion',
  prod: isReact || isReactComponent ? 'node ' + '"' + dirAlias + '/build.js' + '"' + ' --prod' : 'npm run build --prod',
  dev: isReact || isReactComponent ? 'node ' + '"' + dirAlias + '/dev-server.js' + '"' : 'npm run dev',
  test: isReact || isReactComponent ? 'node "' + __dirname +'/../node_modules/jest/bin/jest.js' + '"' + ' --coverage': 'npm run unit',
}
