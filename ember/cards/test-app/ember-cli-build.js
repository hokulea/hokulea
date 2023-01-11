'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
// eslint-disable-next-line node/no-missing-require
const { HOKULEA_CONFIG } = require('@hokulea/ember-asset-loader');
// eslint-disable-next-line node/no-missing-require
const theemoPlugin = require('ember-theemo/lib/webpack');
const packageJson = require('./package');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: Object.keys(packageJson.dependencies)
    },
    ...HOKULEA_CONFIG
  });

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app, {
    packagerOptions: {
      webpackConfig: {
        plugins: [theemoPlugin()]
      }
    }
  });
  // return app.toTree();
};
