'use strict';

const { addonV1Shim } = require('@embroider/addon-shim');
const { HokuleaCssModulesPlugin } = require('./src/css-modules-plugin.js');
const { importAssets } = require('./src/index.js');

module.exports = {
  ...addonV1Shim(__dirname),

  /**
   * Add virtual CSS modules
   */
  createCssModulesPlugin(parent) {
    return new HokuleaCssModulesPlugin(parent);
  },

  /**
   * Add kujenga assets
   */
  included(parent) {
    this._super.included.apply(this, arguments);

    importAssets(parent);
  }
};
