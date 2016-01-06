'use strict';

var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var suite = lab.suite;
var expect = Code.expect;
var test = lab.test;
var sinon = require('sinon');
var testRunner = require('../../lib/test-runner');
var stubbedLabExecutor = require('../../lib/test-executors/lab-executor');


lab.beforeEach(function(done) {
  sinon.stub(stubbedLabExecutor, 'runTests', sinon.spy());
  done();
});

lab.afterEach(function(done) {
  stubbedLabExecutor.runTests.restore();
  done();
});

suite('runTests', function() {
  test('has specified test executor run tests in specified directory', function (done) {
    testRunner.run('test/unit', 'lab');
    expect(stubbedLabExecutor.runTests.calledOnce).to.equal(true);
    expect(stubbedLabExecutor.runTests.args[0][0]).to.deep.equal('test/unit');
    done();
  });

  test('returns error for unrecognized test framework', function (done) {
    var run = testRunner.run.bind(testRunner, 'test/unit', 'kazoo');
    expect(run).to.throw(Error, 'no monitor built for kazoo yet, but features are on the way...');
    done();
  });
});

