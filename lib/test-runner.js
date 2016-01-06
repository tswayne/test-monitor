'use strict';

var testExecutor;

module.exports.run = function(testDirectory, testExecutorName) {
  try {
    var executorPath = './test-executors/' + testExecutorName + '-executor';
    testExecutor = require(executorPath);
  } catch (err) {
    throw new Error('no monitor built for ' + testExecutorName + ' yet, but features are on the way...');
  }

//@todo: catch error, check if report was generated, if not write basic "something went wrong" to reports.html
  testExecutor.runTests(testDirectory);
};
