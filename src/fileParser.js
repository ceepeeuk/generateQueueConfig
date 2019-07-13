const readLineFile = require('read-line-file');

module.exports.getQueues = async (file) => {
  return new Promise((resolve => {
    const queues = [];
    readLineFile(file,
      (line) => {
        if (line.startsWith('SQS_')) {
          queues.push(line.split('=')[1]);
        }
      },
      () => resolve(queues),
      (err) => console.error(err)
    );
  }));
};