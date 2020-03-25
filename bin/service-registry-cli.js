#!/usr/bin/env node
const program = require('commander');
const tasks = require('../src/tasks');

const version = require('../package.json').version;

program
  .version(version, '-v, --version')
  .name('service-registry-cli')
  .command('pull')
  .option('-h, --host <host>', '(Default: "127.0.0.1:2379") etcd host', '127.0.0.1:2379')
  .option('-e, --env <environment>', '(Default: "dev") environment(dev, staging or prod) to register service.', 'dev')
  .action(async (opts) => {
    await tasks.pull({
      env: opts.env,
      host: opts.host
    })
  });

  program
  .command('register')
  .option('-h, --host <host>', '(Default: "127.0.0.1:2379") etcd host', '127.0.0.1:2379')
  .option('-e, --env <environment>', '(Default: "dev") environment(dev, staging or prod) to register service.', 'dev')
  .requiredOption('--service.endpoint <string>', 'service endpoint to register service.')
  .action(async (opts) => {
     await tasks.register({
      env: opts.env,
      host: opts.host,
      serviceEndpoint: opts['service.endpoint']
     })
  });

program.on('--help', function () {
  console.info('\nTo get available options for a command:');
  console.info('  service-registry-cli [command] -h');
});

program.on('command:*', (command) => {
  console.error(`error: invalid command \`${command}\`\n`);
  program.help();
});


program.parse(process.argv);
