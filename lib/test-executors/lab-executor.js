'use strict';

const path = require('path');
const process = require('child_process');

module.exports.runTests = testDir => {
  const reportDir = path.join(__dirname, '../../report.html');
  const cmd = `node_modules/lab/bin/lab -r html -o ${reportDir} ${testDir}`;
  console.log('running tests');
  process.exec(cmd, error => {
    if (error) {
      throw error;
    }
    /* $lab:coverage:off$ */
    console.log('waiting for changes');
    /* $lab:coverage:on$ */
  });
};
