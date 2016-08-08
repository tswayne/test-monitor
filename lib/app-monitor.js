'use strict';

const Supervisor = require('supervisor');
const Path = require('path');
const Process = require('child_process');

module.exports.watchDirectoryAndRunTestsOnChanges =
  (watchPath, testPath, testExecutionEngine) => {
    const supervisorArgs = [
      '-w',
      watchPath,
      '-q',
      '-n',
      'error',
      '-n',
      'exit',
      '-i',
      'node_modules',
      '--',
      Path.join(__dirname, '../bin/testRunnerDaemon.js'),
      testPath,
      testExecutionEngine
    ];

    Supervisor.run(supervisorArgs);
  };

module.exports.watchReportAndReloadBrowserOnChanges = () => {
  const exec = Process.exec;
  const cmd = 'node_modules/reload/bin/reload -b -s coverage/index.html';
  const options = {cwd: Path.join(__dirname, '..')};
  exec(cmd, options, error => {
    if (error) {
      throw error;
    }
  });
};
