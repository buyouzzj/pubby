/* eslint-disable */
require('eventsource-polyfill')
var hotClient = require('hotMiddleware') // noInfo=true&

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    // window.location.reload()
  }
})
