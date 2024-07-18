'use strict';

const { addonV1Shim } = require('@embroider/addon-shim');
// eslint-disable-next-line n/no-unpublished-require
const { HokuleaCssModulesPlugin } = require('./lib/css-modules-plugin.js');
// eslint-disable-next-line n/no-unpublished-require
const { importAssets } = require('./lib/index.js');

function isEngine(parent) {
  return parent._engineConfig !== undefined;
}

function isApp(parent) {
  return parent.env !== undefined && !isEngine(parent);
}

module.exports = {
  ...addonV1Shim(__dirname),

  /**
   * Add virtual CSS modules
   */
  createCssModulesPlugin(parent) {
    return new HokuleaCssModulesPlugin(parent);
  },

  /**
   * Add hokulea assets
   */
  included(parent) {
    this._super.included.apply(this, arguments);

    // the assets are included only in the app of a related package
    //
    // that refers to:
    // - the "dummy" app in addons v1 and engines
    // - test-app in addons v2
    // - an app
    //
    // not only is this performance related to not include the same asset
    // multiple times. When included multiple times, the assets can overwrite
    // their specificity, when included from multiple locations.
    // This troubles the browser finding the right CSS class, as there may be
    // multiple of them present, overwriting their own values, causing wrong
    // renderings.

    if (isApp(parent)) {
      importAssets(parent);
    }
  }
};
