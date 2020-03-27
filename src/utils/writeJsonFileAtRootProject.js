const R = require('ramda');
const rootDir = require('app-root-dir');
const fs = require('fs-extra');
const { InternalError } = require('json-api-error');
const path = require('path');
const { promisify } = require('util');

const writeJsonAsync = promisify(fs.writeJson);

const dir = rootDir.get();

const writeJsonAtRootProject = R.curry((fileName, content) => R.pipeP(
  (f) => Promise.resolve(path.resolve(dir, f)),
  async (absolutePath) => {
    let result;

    try {
      result = await writeJsonAsync(absolutePath, content, {
        spaces: 2,
      })
    } catch (err) {
      throw new InternalError(`Error in writing file at ${absolutePath}`);
    }

    return result;
  },
)(fileName))

module.exports = writeJsonAtRootProject;
