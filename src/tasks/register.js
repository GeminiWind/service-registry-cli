const { default: ServiceRegistryFactory } = require('@hai.dinh/service-registry');
const readJsonAtRootProject = require('../utils/readJsonFileAtRootProject');

const register = async ({ env, hosts, serviceEndpoint }) => {
  console.log(ServiceRegistryFactory, 'wtf');
  const registry = ServiceRegistryFactory.create({
    driver: 'etcd',
    hosts,
    env,
  });

  const serviceDefinition = await readJsonAtRootProject('service-definition.json');
  const packageInfo = await readJsonAtRootProject('package.json');

  await registry.register({
    id: serviceDefinition.id,
    name: serviceDefinition.name,
    category: serviceDefinition.category,
    endpoint: serviceEndpoint,
    version: packageInfo.version,
  })
}

module.exports = register;
