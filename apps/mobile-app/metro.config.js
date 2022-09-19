const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const defaultConfig = getDefaultConfig(__dirname);

// fix error where metro doesn't by default use cjs files that firebase provides
// https://github.com/expo/expo/issues/17469
defaultConfig.resolver.assetExts.push('cjs');

// monorepo
defaultConfig.watchFolders = [workspaceRoot];
defaultConfig.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = defaultConfig;
