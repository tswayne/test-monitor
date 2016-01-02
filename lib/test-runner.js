'use strict';


var wait = function() {
  setTimeout(wait, 15000)
};


module.exports.runTests = function(driver) {
  var path = require('path');
  var exec = require('child_process').exec;
  var cmd = 'node_modules/lab/bin/lab -r html -o ' + path.join(__dirname, '../report.html') + ' ' + process.argv[2];

  console.log('running tests');
  exec(cmd, function(error, stdout, stderr) {
    if (error) throw error;
    setTimeout(wait, 15000);
  });

  console.log('waiting for changes');
};
