var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var suite = lab.suite;
var expect = Code.expect;
var test = lab.test;
var sinon = require('sinon');

var runTests = require('../lib/test-runner').runTests;
var mockProcess = require('child_process');

suite('runTests', function() {
  test('pulls 12 card from the deck and starts the game', function (done) {
    mockProcess.exec = sinon.spy();
    process.argv[2] = 'test'
    runTests('lab');
    expect(mockProcess.exec.args[0][0]).to.deep.equal('node_modules/lab/bin/lab -r html -o /home/tyler/dev/test-monitor/report.html test');
    done();
  })
});
