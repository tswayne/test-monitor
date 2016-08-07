'use strict';

var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var suite = lab.suite;
var expect = Code.expect;
var test = lab.test;
var argumentParser = require('../../lib/argument-parser');
var fixtures = require('../test-utils/fixtures');


suite('parseApplicationArguments', function() {
  test('parses argument array into argument object', function (done) {
    var argumentObject = argumentParser.parseApplicationArguments(fixtures.fullArgumentArray());
    expect(argumentObject).to.equal({testExecutor: 'mocha', testPath: 'tests', watchPath: 'lib'});
    done();
  });

  test('order of arguments does not matter', function (done) {
    var fullArgArray = fixtures.fullArgumentArray();
    fullArgArray.push(fullArgArray.shift());
    fullArgArray.push(fullArgArray.shift());
    var argumentObject = argumentParser.parseApplicationArguments(fullArgArray);
    expect(argumentObject).to.equal({testExecutor: 'mocha', testPath: 'tests', watchPath: 'lib'});
    done();
  });

  test('returns defaults for unspecified arguments', function (done) {
    var argumentObject = argumentParser.parseApplicationArguments([]);
    expect(argumentObject).to.equal({testExecutor: 'lab', testPath: 'test', watchPath: '.'});
    done();
  });

  test('unrecognized arguments are ignored', function (done) {
    var fullArgArray = fixtures.fullArgumentArray();
    fullArgArray.push('-x', 'kazoo');
    var argumentObject = argumentParser.parseApplicationArguments(fullArgArray);
    expect(argumentObject).to.equal({testExecutor: 'mocha', testPath: 'tests', watchPath: 'lib'});
    done();
  });
});
