var path = require('path');
var inquirer = require('inquirer');
var qtRoot = require.resolve('@alipay/qingting').replace('main.js', '');
var commands = require(path.join(qtRoot, './commands'));
var config = require(path.join(qtRoot, './lib/config'));

var questions = [
  {
    type: 'input',
    name: 'username',
    message: '请输入域账号: ',
    default: config.get('user').username,
    validate: function (value) {
      if (value) {
        return true;
      }
      return '域账号不为空';
    }
  },
  {
    type: 'password',
    name: 'password',
    message: '请输入密码: ',
    validate: function (value) {
      if (value) {
        return true;
      }
      return '密码不为空';
    }
  }
];

module.exports = function() {
  inquirer.prompt(questions).then(function(answers) {
    commands.login(answers);
  });
}
