require('shelljs/global');
var chalk = require('chalk');
var updater = require('npm-updater');
var cmdExists = require('./utils/cmd-exists');

// 检查版本是否为最新
function checkVersion(callback) {
  var cubePkg = require('../package.json');
  updater({
    package: cubePkg,
    registry: "http://registry.npm.alibaba-inc.com",
    abort: false,
    interval: '1s',
    tag: 'release',
    updateMessage: '你可以执行 cube upgrade 来安装此版本。\n如果提示没有权限，请执行 sudo chown -R $(whoami) ~/.npm && sudo chown -R $(whoami) /usr/local/lib/node_modules 后再次尝试。\n'
  }).then(function(){
    callback();
  }).catch(function(err){
    console.error(err.stack);
    exit(1);
  });
}

// 检查package.json是否有cube配置
function checkCube(callback) {
  var pkg = require('./utils/pkg');
  if (pkg.get('cube')) {
    callback();
  } else {
    console.log(chalk.red.inverse("错误") + " " + "CUBE不支持该工程, 请检查package.json");
    exit(1);
  }
}

// 检查tnpm
function checkTnpm(callback) {
  cmdExists('tnpm', function(err, cmdExists) {
    // 执行失败
    if (!cmdExists) {
      console.log(chalk.inverse("安装") + " " + "tnpm命令");
      exec('npm install -g tnpm --registry=http://registry.npm.alibaba-inc.com', {
        silent: false,
        async: true
      }, function(code, stdout, stderr) {
        if (code === 0) {
          callback();
        } else {
          console.log('\n');
          console.log(chalk.red.inverse("失败") + " " + "安装tnpm命令失败");
          exit(1);
        }
      });
    }
    // 执行成功
    else {
      callback();
    }
  });
}

module.exports = function(callback, disableCheckCube) {
  checkVersion(function() {
    if (!disableCheckCube) {
      checkCube(function() {
        checkTnpm(callback);
      });
    } else checkTnpm(callback);
  });
}
