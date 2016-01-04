var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var suite = lab.suite;
var expect = Code.expect;
var test = lab.test;
var sinon = require('sinon');

var mockProcess = require('child_process');

suite('lab: runTests', function() {
  test('runs tests with coverage for tests in specified test directory', function (done) {
    mockProcess.exec = sinon.spy();
    var executor = require('../../../lib/test-executors/lab-executor');

    executor.runTests('test');
    expect(mockProcess.exec.calledOnce).to.equal(true);
    expect(mockProcess.exec.args[0][0]).to.deep.equal('node_modules/lab/bin/lab -r html -o /home/tyler/dev/test-monitor/report.html test');
    done();
  })
});
