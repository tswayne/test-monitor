var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var suite = lab.suite;
var expect = Code.expect;
var test = lab.test;
var sinon = require('sinon');

var mockProcess = require('child_process');
var executor = require('../../../lib/test-executors/lab-executor');

var containsCorrectPath = function(fullPath) {
  return fullPath.indexOf('/report.html') > 0;
};

suite('lab: runTests', function() {
  test('runs tests with coverage for tests in specified test directory', function (done) {
    sinon.stub(mockProcess, 'exec', sinon.spy());

    executor.runTests('test');

    expect(mockProcess.exec.calledOnce).to.equal(true);
    expect(mockProcess.exec.args[0][0].substring(0, 35)).to.equal('node_modules/lab/bin/lab -r html -o');
    expect(containsCorrectPath(mockProcess.exec.args[0][0].substring(35))).to.equal(true);
    mockProcess.exec.restore();
    done();
  });

  test('throws error when error is returned from exec', function (done) {
    sinon.stub(mockProcess, 'exec');
    mockProcess.exec.callsArgWith(1, new Error('error'));

    var runTests = executor.runTests.bind(executor, 'test');
    expect(runTests).to.throw(Error, 'error');

    mockProcess.exec.restore();
    done();
  });

  test('does not throw error when no error is returned', function (done) {
    sinon.stub(mockProcess, 'exec');
    mockProcess.exec.callsArgWith(1, null);

    executor.runTests('test');
    done();
  })
});
