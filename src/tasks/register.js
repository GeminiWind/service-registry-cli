const { default: ServiceRegistryFactory } = require('@hai.dinh/service-registry');
const readJsonAtRootProject = require('../utils/readJsonFileAtRootProject');

const register = async ({ env, host, serviceEndpoint }) => {
  console.log(ServiceRegistryFactory, 'wtf');
  const registry = ServiceRegistryFactory.create({
    driver: 'etcd',
    host,
    env,
  });

  const serviceDefinition = await readJsonAtRootProject('service-definition.json');
  const packageInfo = await readJsonAtRootProject('package.json');

  console.log(`Registering service with id: "${serviceDefinition.id}" ...`)

  await registry.register({
    id: serviceDefinition.id,
    name: serviceDefinition.name,
    category: serviceDefinition.category,
    endpoint: serviceEndpoint,
    version: packageInfo.version,
  })
  
  console.log('Done.')
}

module.exports = register;
