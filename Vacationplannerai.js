const functions = require('firebase-functions');
const { spawn } = require('child_process');
const path = require('path');

exports.app = functions.https.onRequest((request, response) => {
  const pythonProcess = spawn('python3', [path.resolve(__dirname, 'main.py')]);

  pythonProcess.stdout.on('data', (data) => {
    response.send(data.toString());
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});
