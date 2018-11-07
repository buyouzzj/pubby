var path = require('path')
var express = require('express')
var port = '80';

var app = express()
var config = require('../config')
var pkg = require('../package.json')

// serve pure static assets
app.use('/' + pkg.cube.domain + pkg.name, express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Proxy started at http://localhost:' + port + '\n')
})
