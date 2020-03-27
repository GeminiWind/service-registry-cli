const Bluebird = require('bluebird');
const { default: ServiceRegistryFactory } = require('@hai.dinh/service-registry');
const writeJsonAtRootProject = require('../utils/writeJsonFileAtRootProject');
const readJsonAtRootProject = require('../utils/readJsonFileAtRootProject');
const ora = require('ora');
const chalk = require('chalk');

const pull = async ({ env, host }) => {
  const registry = ServiceRegistryFactory.create({
    driver: 'etcd',
    host,
    env,
  });

  const spinner = ora('Loading service definition from service-definition.json').start();

  const serviceDefinition = await readJsonAtRootProject('service-definition.json');

  spinner.info(`${chalk.blue('[INFO]')} Resolve dependencies`)

  const resolvedDependencies = await Bluebird.map(serviceDefinition.dependencies, async (serviceId) => {
    let service;
    
    try {
      service = await registry.get(serviceId);
    } catch (error) {
      console.error(error);
      spinner.fail(`${chalk.red('[FAIL]')} Fail to resolve service with id: "${serviceId}"`)

      process.exit(1);
    }

    return service;
  })

  const serviceEnv = {
    id: serviceDefinition.id,
    name: serviceDefinition.name,
    dependencies: resolvedDependencies,
  }

  spinner.info(`${chalk.blue('[INFO]')} Writing to service-env.json`);

  try {
    await writeJsonAtRootProject('service-env.json', serviceEnv);
  } catch (error) {
    console.error(error);
    spinner.fail(`${chalk.red('[FAIL]')} Fail to write result to service-env.json`);

    process.exit(1);
  }

  spinner.succeed(`${chalk.green('[OK]')} Pull successfully.`)
}

module.exports = pull;