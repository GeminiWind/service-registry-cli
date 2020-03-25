const R = require('ramda');
const rootDir = require('app-root-dir');
const fs = require('fs-extra');
const path = require('path');
const { promisify } = require('util');

const writeJsonAsync = promisify(fs.writeJson);

const dir = rootDir.get();

const writeJsonAtRootProject = R.curry((fileName, content) => R.pipeP(
  (f) => Promise.resolve(path.resolve(dir, f)),
  (absolutePath) => writeJsonAsync(absolutePath, content, {
    spaces: 2,
  })
)(fileName))

module.exports = writeJsonAtRootProject;
