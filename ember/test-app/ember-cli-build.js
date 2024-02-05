'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
// eslint-disable-next-line node/no-missing-require
const { HOKULEA_CONFIG, HokuleaAssetLoaderWebpackPlugin } = require('@hokulea/ember/lib');
// eslint-disable-next-line node/no-missing-require
const theemoPlugin = require('ember-theemo/lib/webpack');
const packageJson = require('./package');
const sideWatch = require('@embroider/broccoli-side-watch');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    trees: {
      app: sideWatch('app', {
        watching: [
          '../../foundation/core/dist',
          '../../foundation/tokens/dist',
          '../../themes/moana/dist'
        ]
      })
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true
    },

    autoImport: {
      watchDependencies: Object.keys(packageJson.dependencies),
      webpack: {
        plugins: [new HokuleaAssetLoaderWebpackPlugin()]
      }
    },
    ...HOKULEA_CONFIG
  });

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app, {
    packagerOptions: {
      webpackConfig: {
        plugins: [theemoPlugin(), new HokuleaAssetLoaderWebpackPlugin()]
      }
    }
  });
};
