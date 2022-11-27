#!/usr/bin/env node

const isCi = process.env.CI !== undefined;
if (!isCi) {
  require('husky').install();
}
