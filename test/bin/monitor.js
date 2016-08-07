'use strict';
var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var suite = lab.suite;
var expect = Code.expect;
var test = lab.test;
var sinon = require('sinon');
var fixtures = require('../test-utils/fixtures');

var stubbedAppMonitor = require('../../lib/app-monitor');
var stubbedArgumentParser = require('../../lib/argument-parser');

lab.beforeEach(function(done) {
  process.argv = ['arg1', 'arg2'];
  sinon.stub(stubbedAppMonitor, 'watchDirectoryAndRunTestsOnChanges', sinon.spy());
  sinon.stub(stubbedAppMonitor, 'watchReportAndReloadBrowserOnChanges', sinon.spy());
  sinon.stub(stubbedArgumentParser, 'parseApplicationArguments');
  done();
});

lab.afterEach(function(done) {
  stubbedAppMonitor.watchDirectoryAndRunTestsOnChanges.restore();
  stubbedAppMonitor.watchReportAndReloadBrowserOnChanges.restore();
  stubbedArgumentParser.parseApplicationArguments.restore();
  // since this file is a script must delete cached instance to be able to run again on require
  delete require.cache[require.resolve('../../bin/monitor')];
  done();
});

suite('monitor script', function() {
  test('gets parsed arguments and kicks off watchers', function (done) {
    process.argv = process.argv.concat(fixtures.fullArgumentArray());
    stubbedArgumentParser.parseApplicationArguments.withArgs(fixtures.fullArgumentArray()).returns(stubbedArgumentParser.defaults);
    require('../../bin/monitor');

    expect(stubbedAppMonitor.watchDirectoryAndRunTestsOnChanges.calledOnce).to.equal(true);
    expect(stubbedAppMonitor.watchReportAndReloadBrowserOnChanges.calledOnce).to.equal(true);
    expect(stubbedAppMonitor.watchDirectoryAndRunTestsOnChanges.args[0][0]).to.equal(stubbedArgumentParser.defaults.watchPath);
    expect(stubbedAppMonitor.watchDirectoryAndRunTestsOnChanges.args[0][1]).to.equal(stubbedArgumentParser.defaults.testPath);
    expect(stubbedAppMonitor.watchDirectoryAndRunTestsOnChanges.args[0][2]).to.equal(stubbedArgumentParser.defaults.testExecutor);
    done();
  });

  test('empty argument list passes empty array to argument parser', function (done) {
    stubbedArgumentParser.parseApplicationArguments.withArgs([]).returns(stubbedArgumentParser.defaults);
    require('../../bin/monitor');

    expect(stubbedAppMonitor.watchDirectoryAndRunTestsOnChanges.calledOnce).to.equal(true);
    expect(stubbedAppMonitor.watchReportAndReloadBrowserOnChanges.calledOnce).to.equal(true);
    expect(stubbedAppMonitor.watchDirectoryAndRunTestsOnChanges.args[0][0]).to.equal(stubbedArgumentParser.defaults.watchPath);
    expect(stubbedAppMonitor.watchDirectoryAndRunTestsOnChanges.args[0][1]).to.equal(stubbedArgumentParser.defaults.testPath);
    expect(stubbedAppMonitor.watchDirectoryAndRunTestsOnChanges.args[0][2]).to.equal(stubbedArgumentParser.defaults.testExecutor);
    done();
  });

});
