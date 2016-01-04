var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var suite = lab.suite;
var expect = Code.expect;
var test = lab.test;
var sinon = require('sinon');
var runSpy;
var testRunner = require('../lib/test-runner');

lab.beforeEach(function(done) {
  runSpy = sinon.spy(testRunner, 'run');
  done();
});

lab.afterEach(function(done) {
  testRunner.run.restore();
  //since this file is a script must delete cached instance to be able to run again on require
  delete require.cache[require.resolve('../lib/testRunnerDaemon')];
  done();
});


suite('testRunnerDaemon', function() {
  test('kicks off test runner with specified test directory and test framework', function (done) {
    process.argv[2] = 'test/unit';
    process.argv[3] = 'lab';

    require('../lib/testRunnerDaemon');
    expect(testRunner.run.calledOnce).to.equal(true);
    expect(testRunner.run.args[0]).to.deep.equal(['test/unit', 'lab']);
    done();
  })

  test('kicks off test runner with specified and test framework and default directory if no directory specified', function (done) {
    process.argv[2] = undefined;
    process.argv[3] = 'lab';

    require('../lib/testRunnerDaemon');
    expect(testRunner.run.calledOnce).to.equal(true);
    expect(testRunner.run.args[0]).to.deep.equal(['test', 'lab']);
    done();
  })
});
