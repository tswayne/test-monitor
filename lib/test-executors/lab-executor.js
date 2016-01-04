var path = require('path');
var exec = require('child_process').exec;

module.exports.runTests = function(testDirectory) {

  var cmd = 'node_modules/lab/bin/lab -r html -o ' + path.join(__dirname, '../report.html') + ' ' + testDirectory;

  console.log('running tests');
  exec(cmd, function(error, stdout, stderr) {
    if (error) throw error;
    console.log('waiting for changes');
  });

};
