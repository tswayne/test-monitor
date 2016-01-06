'use strict';
var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var suite = lab.suite;
var expect = Code.expect;
var test = lab.test;
var sinon = require('sinon');
var stubbedTestRunner = require('../../lib/test-runner');

lab.beforeEach(function(done) {
  sinon.stub(stubbedTestRunner, 'run', sinon.spy());
  done();
});

lab.afterEach(function(done) {
  stubbedTestRunner.run.restore();
  //since this file is a script must delete cached instance to be able to run again on require
  delete require.cache[require.resolve('../../bin/testRunnerDaemon')];
  done();
});


suite('testRunnerDaemon', function() {
  test('kicks off test runner with specified test directory and test framework', function (done) {
    process.argv[2] = 'test/unit';
    process.argv[3] = 'lab';

    require('../../bin/testRunnerDaemon');
    expect(stubbedTestRunner.run.calledOnce).to.equal(true);
    expect(stubbedTestRunner.run.args[0]).to.deep.equal(['test/unit', 'lab']);
    done();
  });

  test('kicks off test runner with specified and test framework and default directory if no directory specified', function (done) {
    process.argv[2] = undefined;
    process.argv[3] = 'lab';

    require('../../bin/testRunnerDaemon');
    expect(stubbedTestRunner.run.calledOnce).to.equal(true);
    expect(stubbedTestRunner.run.args[0]).to.deep.equal(['test', 'lab']);
    done();
  });
});
