const R = require('ramda');
const rootDir = require('app-root-dir');
const fs = require('fs-extra');
const { InternalError } = require('json-api-error');
const path = require('path');
const { promisify } = require('util');

const readJsonAsync = promisify(fs.readJSON);

const dir = rootDir.get();

const readJsonAtRootProject = R.pipeP(
  (relativePath) => Promise.resolve(path.resolve(dir, relativePath)),
  async (absolutePath) => {
    let result;

    try {
      result = await readJsonAsync(absolutePath);
    } catch (err) {
      throw new InternalError(`Error in reading file at ${absolutePath}`);
    }

    return result;
  },
)

module.exports = readJsonAtRootProject;
