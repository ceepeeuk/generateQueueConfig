const fs = require('fs');
const handlebars = require('handlebars');
const program = require('commander');

const { getQueues } = require('./fileParser');

const elasticmq = fs.readFileSync('./src/elasticmq.conf.template').toString();
const sqs = fs.readFileSync('./src/sqs-insight.conf.template').toString();

program
  .command('gen <dir> [other...]')
  .action(async (dir, otherDirs) => {
    const files = [dir, ...otherDirs];
    const results = await Promise.all(files.map(async f => await getQueues(f)));
    const queues = [...new Set(results.flat(1))];
    fs.writeFileSync('/Users/chris/home/docker/alpine-sqs/elasticmq.conf', handlebars.compile(elasticmq)({ queues }));
    fs.writeFileSync('/Users/chris/home/docker/alpine-sqs/sqs-insight.conf', handlebars.compile(sqs)({ queues }));
    console.log('done');
  });

program.parse(process.argv);
console.log('running...');
