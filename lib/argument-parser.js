'use strict';
const hoek = require('hoek');

module.exports.defaults = {
  testExecutor: 'lab',
  testPath: 'test',
  watchPath: '.'
};

module.exports.parseApplicationArguments = argumentArray => {
  const argumentObject = hoek.clone(exports.defaults);
  let arg = argumentArray.shift();
  while (arg) {
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
    arg = argumentArray.shift();
  }
  return argumentObject;
};

