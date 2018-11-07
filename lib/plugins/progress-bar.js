var AnsiEscapes = require('ansi-escapes');
var AnsiStyles = require('ansi-styles');
var inverse = AnsiStyles.inverse;
var bgGreen = AnsiStyles.bgGreen;
var bgWhite = AnsiStyles.bgWhite;
var cursorUp = AnsiEscapes.cursorUp;
var cursorDown = AnsiEscapes.cursorDown;
var eraseEndLine = AnsiEscapes.eraseEndLine;
var eraseLine = AnsiEscapes.eraseLine;
var cursorSavePosition = AnsiEscapes.cursorSavePosition;
var cursorRestorePosition = AnsiEscapes.cursorRestorePosition;

function wrap(color, text) {
  return color.open + text + color.close;
}

var firstInit = true;

module.exports = function (webpack) {
  return new webpack.ProgressPlugin(function(percentage, msg) {
    if (firstInit) {
      console.log(' ');
      firstInit = false;
    }
    if (percentage !== 1) {
      var width = 20;
      var finished = parseInt(percentage * 20);
      var remain = width - finished;
      var bar = '';
      for (var i = 0; i < width; i++) {
        if (i < finished) {
          bar += wrap(bgGreen, ' ');
        } else {
          bar += wrap(bgWhite, ' ');
        }
      }
      var rate = parseInt(percentage * 10000) / 100 + '%';
      console.log(' ' + ' ' + '编译进度：' + bar + ' ' + rate + ' ' + msg);
      console.log(cursorSavePosition + eraseLine + cursorUp(2));
    } else {
      console.log(eraseLine + cursorUp(1));
    }
  })
}
