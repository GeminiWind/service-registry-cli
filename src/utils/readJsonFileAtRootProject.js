const R = require('ramda');
const rootDir = require('app-root-dir');
const fs = require('fs-extra');
const path = require('path');
const { promisify } = require('util');

const readJsonAsync = promisify(fs.readJSON);

const dir = rootDir.get();

const readJsonAtRootProject = R.pipeP(
  (relativePath) => Promise.resolve(path.resolve(dir, relativePath)),
  (absolutePath) => readJsonAsync(absolutePath)
)

module.exports = readJsonAtRootProject;
