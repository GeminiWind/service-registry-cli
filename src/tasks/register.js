const { default: ServiceRegistryFactory } = require('@hai.dinh/service-registry');
const readJsonAtRootProject = require('../utils/readJsonFileAtRootProject');
const ora = require('ora');
const chalk = require('chalk');

const register = async ({ env, host, serviceEndpoint }) => {
  const registry = ServiceRegistryFactory.create({
    driver: 'etcd',
    host,
    env,
  });

  const spinner = ora('Loading service information').start();

  let serviceDefinition;
  try {
    serviceDefinition = await readJsonAtRootProject('service-definition.json');
  } catch (error) {
    console.error(error);
    spinner.fail(`${chalk.red('[FAIL]')} Fail to read service-definition.json`);

    process.exit(1);
  }

  let packageInfo;
  try {
    packageInfo = await readJsonAtRootProject('package.json');
  } catch (error) {
    console.error(error);
    spinner.fail(`${chalk.red('[FAIL]')} Fail to read package.json`);

    process.exit(1);
  }

  spinner.info(`${chalk.blue('[INFO]')} - id: ${serviceDefinition.id}`)
  spinner.info(`${chalk.blue('[INFO]')} - name: ${serviceDefinition.name}`)
  spinner.info(`${chalk.blue('[INFO]')} - category: ${serviceDefinition.category}`)
  spinner.info(`${chalk.blue('[INFO]')} - endpoint: ${serviceEndpoint}`)
  spinner.info(`${chalk.blue('[INFO]')} - version: ${packageInfo.version}`)

  spinner.info(`${chalk.blue('[INFO]')} Registering service with id: "${serviceDefinition.id}"`)

  try {
    await registry.register({
      id: serviceDefinition.id,
      name: serviceDefinition.name,
      category: serviceDefinition.category,
      endpoint: serviceEndpoint,
      version: packageInfo.version,
    })
    
    spinner.succeed(`${chalk.green('[OK]')} Successfully registering service with id: "${serviceDefinition.id}"`)
  } catch (err) {
    console.log(err);

    spinner.fail(`${chalk.red('[FAIL]')} Fail to register service with id: "${serviceDefinition.id}"`)

    process.exit(1);
  }
}

module.exports = register;
