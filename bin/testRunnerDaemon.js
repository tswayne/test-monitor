'use strict';

/* $lab:coverage:off$ */
const testDirectory = process.argv[2] || 'test';
/* $lab:coverage:on$ */
const testExecutorName = process.argv[3];
const TestRunner = require('./../lib/test-runner');

TestRunner.run(testDirectory, testExecutorName);
