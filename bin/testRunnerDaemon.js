'use strict';

/* $lab:coverage:off$ */
var testDirectory = process.argv[2] || 'test';
/* $lab:coverage:on$ */
var testExecutorName = process.argv[3];
var testRunner = require('./../lib/test-runner');

testRunner.run(testDirectory, testExecutorName);
