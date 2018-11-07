require('shelljs/global');
var chalk = require('chalk');
var ora = require('ora');

// 全局配置类
var config = {
  async: true
}

var forceExit = false;
process.on('SIGINT', function() { forceExit = true });

// 日期格式化
Date.prototype.Format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(String(o[k]).length)));
    }
  }
  return fmt;
}

// 指令任务类
function Task(params) {
  this.command = params.command;
  this.type = params.type || "normal"; // 三种类型: normal, test
  this.display = params.display || "normal"; // 三种类型: normal, silent, realtime
  this.inf = params.inf;
  this.handler = params.handler; // { suc: null, err: null }
  this.callback = params.callback;
  this.doOnce = params.doOnce;
}

// 链式调用类
function CommandRunner() {
  this.shouldContinue = true;
  this.commandList = [];
  this.startTime = new Date().getTime();
  console.log(chalk.blue("\n" + "--- CUBE 进程启动于 "+ new Date().Format("MM-dd hh:mm:ss") +" ---" + "\n"));
}

// run命令
CommandRunner.prototype.run = function (command, params) {
  params.command = command;
  this.commandList.push(new Task(params));
  return this;
}

CommandRunner.prototype.test = function (command, params, handler) {
  params.command = command;
  params.handler = handler;
  params.type = "test";
  params.display = "silent";
  this.commandList.push(new Task(params));
  return this;
}

// 队列插入结束，开始执行
CommandRunner.prototype.do = function () {
  this.execute();
  return this;
}

CommandRunner.prototype.execute = function () {
  if (this.shouldContinue) {
    if (this.commandList.length > 0) {
      var _this = this;
      var el = this.commandList[0];

      // 命令相关参数
      var command = el.command;
      var msg = el.inf;
      var isTest = !!el.type === "test";
      var stdData = "";

      // 小菊花
      var spinner = null;
      if (el.display !== "silent") { // 静默模式下不显示命令标题
        spinner = ora(chalk.inverse("执行") + " " + (msg || command));
      }
      if (spinner) {
        if (el.display !== 'realtime') { // 实时模式下菊花不刷新
          spinner.start();
        } else {
          spinner.render();
          console.log(" ");
        }
      }

      // 执行
      var result = exec(command, {
        silent: el.display !== "realtime", // 普通和静默模式下不显示命令执行时内容
        async: config.async
      }, function(code, stdout, stderr) {

        // 推出数组
        _this.commandList.shift();

        // 特殊执行失败情况
        var specialError = false;
        if ((command.indexOf('build') > -1 || command.indexOf('publish') > -1) && stdData.indexOf('ERROR') > -1) {
          specialError = true;
        }

        // 执行失败
        if (code !== 0 || specialError) {
          _this.shouldContinue = false;
          if (el.display === "normal") {
            spinner.text = chalk.red.inverse("失败") + " " + (msg || command);
            spinner.fail();
            console.log(chalk.red(stdData ? stdData + "\n" + stderr : stderr));
          }
          // 执行完毕后回调
          if (typeof el.callback === "function") {
            el.callback("ERR");
          }
        }

        // 执行成功
        else {
          if (el.display === "normal") {
            spinner.text = chalk.green.inverse("成功") + " " + (msg || command);
            spinner.succeed();
            console.log(chalk.green(stdData));
          }
          // 执行完毕后回调
          if (typeof el.callback === "function") {
            el.callback("SUC");
          }
        }
        // realtime的空一行
        if (el.display === "realtime" && !el.doOnce && _this.commandList.length !== 0) {
          console.log(" ");
        }

        if (!el.doOnce) {
          _this.do();
        }
      });

      // 处理标准输出
      result.stdout.on("data", function(data){
        // if (el.display === "realtime") {
        //   console.log(data);
        // } else {
          stdData += data;
        // }
      });
    } else {
      console.log(chalk.green("\n--- 命令执行完成 (耗时: "+ (new Date().getTime() - this.startTime) + "ms) ---"));
    }
  } else {
    if (forceExit) exit(1);
    console.log(chalk.red("--- 命令队列未执行完成 ---"));
    exit(1);
  }
  return this;
}

module.exports = {
  CommandRunner: CommandRunner,
  Task: Task
};
