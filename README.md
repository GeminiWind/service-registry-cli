# **service-registry-cli**

service-registry-cli is a command-line helper for [service-registry](https://www.npmjs.com/package/@hai.dinh/service-registry).

## Installation
The easiest way to install `service-registry-cli` is using NPM. If you have Node.js installed, it is most likely that you have NPM installed as well.

```
$ npm install @hai.dinh/service-registry-cli
```

## Usage

### Register a new service

The `service-registry-cli` command allows you to register a new service.

```
$ service-registry-cli register --service.endpoint http://localhost:1001
```

#### Options

```
service-registry-cli register --service.endpoint <endpoint > -h <etcd-server-host> -e <environment>
```

- ```-h <host>, --hosts<hosts>```

Specify etcd host service. Default: "127.0.0.1:2379".

- ```-e <environment>, --environment<environment>```

Specify your workspace like: dev, staging or prod.

- ```--service.endpoint <endpoint>```

Specify the endpoint of service. Other service information 'll be taked from `service-definition.json` file at root

### Pull

The `service-registry-cli` command takes dependencies input from `service-definition.json`, then resolves these dependencies. Output 'll be wrote at `service-env.json`

```
$ service-registry-cli pull
```

#### Options

```
service-registry-cli pull -h <etcd-server-host> -e <environment>
```

- ```-h <host>, --hosts<hosts>```

Specify etcd host service. Default: "127.0.0.1:2379".

- ```-e <environment>, --environment<environment>```

Specify your workspace like: dev, staging or prod.

