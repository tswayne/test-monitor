'use strict';

var exec = require('child_process').exec;
var cmd = 'node_modules/lab/bin/lab -r html -o coverage.html ' + process.argv[2];

console.log('running tests');
exec(cmd, function(error, stdout, stderr) {
  console.log('waiting for changes');
});

var wait = function() {
  setTimeout(wait, 15000)
};

setTimeout(wait, 15000);
