#!/usr/bin/env node

const path = require('path');
const { readFileSync } = require('fs');

/**
 * Gets an environment variable, when dotenv is not available, from
 *
 * - EAS secrets when using the hosted EAS Build service
 * - `.env` file when running EAS Build locally
 * @param ENV { string }
 * @returns { string } string or throws an error if the environment variable can't be found
 */
module.exports = function (ENV) {
  /**
   * @type string | undefined
   */
  let envVariableString;

  if (process.env.EAS_BUILD_RUNNER === 'eas-build') {
    envVariableString = process.env[ENV];
  } else {
    const filePath = path.join(__dirname, '../../.env');
    const envFileString = readFileSync(filePath).toString('ascii');

    envVariableString = new RegExp('(?<=' + ENV + '=).*').exec(envFileString)[0];
  }

  if (!envVariableString) {
    throw new Error(`Could not load env variable ${ENV}`);
  }

  return envVariableString;
};
