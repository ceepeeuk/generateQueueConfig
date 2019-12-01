const fs = require('fs');
const mustache = require('mustache');
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
    // fs.writeFileSync('./elasticmq.conf', mustache.render(elasticmq, { queues }));
    // fs.writeFileSync('./sqs-insight.conf', mustache.render(sqs, { queues }));
    fs.writeFileSync('/home/chris/docker/alpine-sqs/elasticmq.conf', mustache.render(elasticmq, { queues }));
    fs.writeFileSync('/home/chris/docker/alpine-sqs/sqs-insight.conf', mustache.render(sqs, { queues }));
    console.log('done');
  });

program.parse(process.argv);
console.log('running...');
