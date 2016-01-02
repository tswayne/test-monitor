'use strict';

var path = require('path');
var exec = require('child_process').exec;
var cmd = 'node_modules/lab/bin/lab -r html -o ' + path.join(__dirname, '../report.html') + ' ' + process.argv[2];
console.log(cmd);

console.log('running tests');
exec(cmd, function(error, stdout, stderr) {
  if (error) throw error;
});

console.log('waiting for changes');
var wait = function() {
  setTimeout(wait, 15000)
};

setTimeout(wait, 15000);
