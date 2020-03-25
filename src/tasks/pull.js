const Bluebird = require('bluebird');
const { default: ServiceRegistryFactory } = require('@hai.dinh/service-registry');
const writeJsonAtRootProject = require('../utils/writeJsonFileAtRootProject');
const readJsonAtRootProject = require('../utils/readJsonFileAtRootProject');

const pull = async ({ env, hosts }) => {
  const registry = ServiceRegistryFactory.create({
    driver: 'etcd',
    hosts,
    env,
  });

  const serviceDefinition = await readJsonAtRootProject('service-definition.json');

  const resolvedDependencies = await Bluebird.map(serviceDefinition.dependencies, async (serviceId) => {
    const service = await registry.get(serviceId);

    return service;
  })

  const serviceEnv = {
    id: serviceDefinition.id,
    name: serviceDefinition.name,
    dependencies: resolvedDependencies,
  }

  console.log(serviceEnv);

  await writeJsonAtRootProject('service-env.json', serviceEnv);
}

module.exports = pull;