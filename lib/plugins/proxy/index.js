const chalk = require('chalk');
const anyproxy = require('cube-anyproxy');
const ProxyServer = anyproxy.proxyServer;
const certMgr = require('./certMgr');
const ifRootCAFileExists = certMgr.ifRootCAFileExists;
const generateRootCA = certMgr.generateRootCA;
const ifRootCATrusted = certMgr.ifRootCATrusted;

const getRule = require('./getRule');

module.exports = (params) => {
  console.log("\n"+chalk.inverse("执行") + " " + "正在启动静态代理与数据mock服务\n");
  if (!ifRootCAFileExists()) generateRootCA(() => {});
  ifRootCATrusted((err, result) => {
    if (!result) {
      console.log(chalk.yellow('为正常使用https代理，请手动信任rootCA证书，详见: http://anyproxy.io/cn.html#配置帮助'));
    }
    const port = params.port;
    const proxyServer = new ProxyServer({
      type: 'http',
      port,
      hostname: 'localhost',
      rule: getRule({ port }),
      autoTrust: true,
      // silent: true
    });
    console.log('\n' + chalk.green('代理服务成功启动，端口号为: ' + port));
  });
};
