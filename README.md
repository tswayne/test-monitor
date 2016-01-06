# Test Monitor

[![Build Status](https://travis-ci.org/tswayne/test-monitor.svg?branch=master)](https://travis-ci.org/tswayne/test-monitor)
[![NPM](https://nodei.co/npm/test-monitor.png?downloads=true)](https://nodei.co/npm/test-monitor/)

Automated test monitoring tool.

## About

Test Monitor is a tool that:
* Runs your test suite on code change
* Displays test output and coverage reports in a web page
* Refreshes content of web page when test suit is run

Test monitor combines a handful of open source tools to help you keep an eye on your tests while you code.  

## How to use:

* Install globally: npm install -g test-monitor
* Run in app directory: test-monitor

#### OR

* Install the package using install dev: npm install-dev --save test-monitor
* Add command to npm script in package.json to monitor
```javascript
"monitor": "node_modules/test-monitor/bin/monitor"
```
* Run: npm run monitor

## Options
Test monitor supports the following options:
- `-e` - Specify which test executor to use. Defaults to lab.
- `-t` - Path to run test suite. Defaults to test.
- `-w` - Directory to watch for changes. Defaults to entire application (except dependencies).

## Notes
This is a very early release and still needs a lot of work.  Currently only works for the test framework lab, but can/will be 
updated to work with other js test utilities and forms of displaying test results.  

## How it works
This tool combines supervisor (to watch for code changes), reload (to watch report output and reload browser), and test framework (to execte tests
and produce report).
* supervisor: https://github.com/petruisfan/node-supervisor
* reload: https://github.com/jprichardson/reload
* lab: https://github.com/hapijs/lab

## Missing anything?
Feel free to submit a pull request to help clean this up, add your favorite test framework, or whatever else you think is missing!
