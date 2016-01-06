var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var suite = lab.suite;
var expect = Code.expect;
var test = lab.test;
var sinon = require('sinon');
var path = require('path');
var supervisor = require('supervisor');
var mockProcess = require('child_process');
var appMonitor = require('../../lib/app-monitor');


suite('watchReportAndReloadBrowserOnChanges', function() {
  test('executes reload process in base path on report.html', function (done) {
    sinon.stub(mockProcess, 'exec', sinon.spy());

    appMonitor.watchReportAndReloadBrowserOnChanges();

    expect(mockProcess.exec.calledOnce).to.equal(true);
    expect(mockProcess.exec.args[0][0]).to.equal('node_modules/reload/bin/reload -b -s report.html');
    expect(mockProcess.exec.args[0][1].cwd).to.equal(path.join(__dirname, '../..'));
    mockProcess.exec.restore();
    done();
  });

  test('throws error when process returns error', function (done) {
    sinon.stub(mockProcess, 'exec');
    mockProcess.exec.callsArgWith(2, new Error('error'));

    var monitor = appMonitor.watchReportAndReloadBrowserOnChanges.bind(appMonitor);
    expect(monitor).to.throw(Error, 'error');

    mockProcess.exec.restore();
    done();
  });

  test('returns without issues if no error is thrown', function (done) {
    sinon.stub(mockProcess, 'exec');
    mockProcess.exec.callsArgWith(2, null);

    appMonitor.watchReportAndReloadBrowserOnChanges();
    mockProcess.exec.restore();
    done();
  })
});

suite('watchDirectoryAndRunTestsOnChanges', function() {
  test('calls lab on testRunner, watching specified directory, passing app specific args', function (done) {
    sinon.stub(supervisor, 'run', sinon.spy());

    appMonitor.watchDirectoryAndRunTestsOnChanges('/test-monitor', 'tests', 'lab');
    expect(supervisor.run.calledOnce).to.equal(true);
    expect(supervisor.run.args[0][0][1]).to.equal('/test-monitor');
    expect(supervisor.run.args[0][0][10]).to.equal(path.join(__dirname, '../../bin/testRunnerDaemon.js'));
    expect(supervisor.run.args[0][0][11]).to.equal('tests');
    expect(supervisor.run.args[0][0][12]).to.equal('lab');
    supervisor.run.restore();
    done();
  });
});

