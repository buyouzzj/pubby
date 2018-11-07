// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var projectRoot = process.cwd();
var fs = require('fs')

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)

exec('node ' + '"' + path.join(__dirname, '../../node_modules/babel-cli/bin/babel.js') + '"' + ' src --out-dir dist --copy-files --compact=true');
