'use strict';

var path = require('path');
var exec = require('child_process').exec;
var testUtilPath = path.join(__dirname, '../node_modules/lab/bin/lab');
var cmd = testUtilPath + ' -r html -o ' + path.join(__dirname, '../report.html') + ' ' + process.argv[2];

console.log('running tests');
exec(cmd, function(error, stdout, stderr) {
  console.log('waiting for changes');
});

var wait = function() {
  setTimeout(wait, 15000)
};

setTimeout(wait, 15000);
