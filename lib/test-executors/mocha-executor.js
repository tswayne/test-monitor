'use strict';

const path = require('path');
const process = require('child_process');

module.exports.runTests = testDir => {
  const reportDir = path.join(__dirname, '../../coverage');
  const cmd = `export NODE_ENV=test && ./node_modules/.bin/istanbul cover -- --report html --dir ${reportDir} ./node_modules/.bin/_mocha `;
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
