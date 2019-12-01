const readLineFile = require('read-line-file');

module.exports.getQueues = async (file) => {
  return new Promise((resolve => {
    const queues = [];
    readLineFile(`${file}/.env`,
      (line) => {
        if (line.startsWith('SQS_')) {
          queues.push(line.split('=')[0]);
        }
      },
      () => resolve(queues),
      (err) => console.error(err)
    );
  }));
};
