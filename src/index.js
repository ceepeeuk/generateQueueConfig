const program = require('commander');

const {getQueues} = require('./fileParser');

program
  .command('gen <dir> [other...]')
  .action(async (dir, otherDirs) => {
    const files = [dir, ...otherDirs];
    const results = await Promise.all(files.map(async f => await getQueues(f)));
    const queues = [...new Set(results.flat(1))];
    console.log(queues);
  });

program.parse(process.argv);
