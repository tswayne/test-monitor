'use strict';

module.exports.fullArgumentArray = function() {
  return ['-e', 'mocha', '-w', 'lib', '-t', 'tests'];
};
