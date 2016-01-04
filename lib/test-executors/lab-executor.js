var path = require('path');
var process = require('child_process');

module.exports.runTests = function(testDirectory) {

  var cmd = 'node_modules/lab/bin/lab -r html -o ' + path.join(__dirname, '../../report.html') + ' ' + testDirectory;
  console.log('running tests');

  process.exec(cmd, function(error, stdout, stderr) {
    if (error) throw error;
    console.log('waiting for changes');
  });

};
