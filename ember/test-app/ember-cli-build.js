'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
// eslint-disable-next-line n/no-missing-require
const {
  HOKULEA_CONFIG,
  HOKULEA_ICON_PATH,
  HokuleaAssetLoaderWebpackPlugin
} = require('@hokulea/ember/lib');
// eslint-disable-next-line n/no-missing-require
const theemoPlugin = require('ember-theemo/lib/webpack');
const packageJson = require('./package');
const sideWatch = require('@embroider/broccoli-side-watch');
const { GlimmerScopedCSSWebpackPlugin } = require('glimmer-scoped-css/webpack');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    trees: {
      app: sideWatch('app', {
        watching: [
          '../package/dist',
          '../../incubator/aria-navigator/dist',
          '../../incubator/ember-aria-navigator/package/dist',
          '../../foundation/core/dist',
          '../../foundation/tokens/dist',
          '../../themes/moana/dist'
        ]
      })
    },

    babel: {
      plugins: [require.resolve('ember-concurrency/async-arrow-task-transform')]
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true
    },

    svgJar: {
      sourceDirs: ['public/icons', HOKULEA_ICON_PATH]
    },

    autoImport: {
      watchDependencies: Object.keys(packageJson.dependencies),
      webpack: {
        plugins: [new HokuleaAssetLoaderWebpackPlugin(), new GlimmerScopedCSSWebpackPlugin()]
      }
    },
    ...HOKULEA_CONFIG
  });

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app, {
    packagerOptions: {
      webpackConfig: {
        plugins: [
          theemoPlugin(),
          new HokuleaAssetLoaderWebpackPlugin(),
          new GlimmerScopedCSSWebpackPlugin()
        ]
      }
    }
  });
};
