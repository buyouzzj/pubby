const path = require('path');
const existsSync = require('fs').existsSync;
const getProxyConfigFn = require('./getProxyConfig');

module.exports = function getRule({ port }) {
  const getProxyConfig = getProxyConfigFn('proxy.config.js', { port });
  return require('./rule')({
    port,
    hostname: '127.0.0.1',
    getProxyConfig,
    cwd: process.cwd()
  });
}
