'use strict';

var supervisor = require('supervisor');
var reload = require('reload');
var path = require('path');
var process = require('child_process');

module.exports.watchDirectoryAndRunTestsOnChanges = function(watchPath, testPath, testExecutionEngine) {
  var supervisorArgs = ['-w', watchPath, '-q', '-n', 'error', '-n', 'exit', '-i', 'node_modules',
    '--', path.join(__dirname, '../bin/testRunnerDaemon.js'), testPath, testExecutionEngine];

  supervisor.run(supervisorArgs);
};

module.exports.watchReportAndReloadBrowserOnChanges = function() {
  var exec = process.exec;
  var cmd = 'node_modules/reload/bin/reload -b -s report.html';
  var options = {cwd:  path.join(__dirname, '..')};
  exec(cmd, options, function(error, stdout, stderr) {
    if (error) throw error;
  });
};
