// win下git@形式转换
function repoConverter(url) {
  if (url.indexOf('git@') === 0 && process.platform == 'win32') {
    url = url.replace(':', '/').replace('git@', 'http://');
  }
  return url;
}

// 获取分支
function getBranch() {
  var branch = exec('git symbolic-ref --short -q HEAD', { silent: true }).stdout;
  return branch && branch.trim();
}

// 获取remote
function getRemote() {
  var remote = exec('git remote', { silent: true }).stdout;
  return remote;
}

var pkg = require('./pkg');
var repoUrl = getRemote().trim() || repoConverter(pkg.get('repository').url);

module.exports = {
  // 获取分支
  getBranch: getBranch,
  // 获取remote
  getRemote: getRemote,
  // 拉取命令
  pull: function(branch) {
    return 'git pull --rebase ' + repoUrl + (branch ? ' ' + branch : '')
  },
  // 添加到缓冲区
  add: function() { return 'git add .' },
  // 提交
  commit: function(msg) { return 'git commit -m "' + msg + '"'},
  // 切换&创建分支
  checkout: function(branch, param) {
    return 'git checkout ' + (param ? param + ' ' : '') + (branch || '');
  },
  // 推到远程分支
  push: function(branch) {
    return 'git push ' + repoUrl + ' ' + branch;
  },
  // 本地打tag
  tag: function(name) {
    return 'git tag ' + name;
  },
  // 删除远程tag
  delTag: function(name) {
    return 'git tag -d ' + name + ' && ' + 'git push ' + repoUrl + ' :refs/tags/' + name;
  },
  // 推送到远程tag --tags
  pushTag: function(name) {
    return 'git push ' + repoUrl + ' ' + name;
  },
  // 合并
  merge: function(branch) {
    return 'git merge ' + branch;
  }
}
