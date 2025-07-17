/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */

const { HokuleaCssModulesPlugin } = require('./plugin');
const pkg = require('./package.json');

module.exports = {
  name: pkg.name,

  createCssModulesPlugin(parent) {
    return new HokuleaCssModulesPlugin(parent);
  }
};
