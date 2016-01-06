'use strict';
var hoek = require('hoek');

module.exports.defaults = {
  testExecutor: 'lab',
  testPath: 'test',
  watchPath: '.'
};

module.exports.parseApplicationArguments = function(argumentArray) {
  var argumentObject = hoek.clone(exports.defaults);
  var arg;
  while (arg = argumentArray.shift()) {
    switch (arg) {
      case '-e':
        argumentObject.testExecutor = argumentArray.shift();
        break;
      case '-t':
        argumentObject.testPath = argumentArray.shift();
        break;
      case '-w':
        argumentObject.watchPath = argumentArray.shift();
        break;
      default:
        console.log(arg, 'is not a valid argument');
        argumentArray.shift();
        break;
    }
  }
  return argumentObject;
};

