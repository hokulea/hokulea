'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { HOKULEA_CONFIG, HokuleaAssetLoaderWebpackPlugin } = require('@hokulea/ember/lib');
const hokuleaPostCSSConfig = require('@hokulea/config-postcss');
const packageJson = require('./package');

const withSideWatch = require('./lib/with-side-watch');
const postCSSPlugins = hokuleaPostCSSConfig.plugins;
const postCSSModulesIndex = hokuleaPostCSSConfig.plugins.indexOf(require('postcss-modules'));

if (postCSSModulesIndex !== -1) {
  postCSSPlugins.splice(postCSSModulesIndex, 1);
}

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    trees: {
      app: withSideWatch('app', { watching: ['../foundation/core/dist', '../foundation/tokens/dist'] })
    },

    babel: {
      sourceMaps: 'inline'
    },

    ...HOKULEA_CONFIG,

    autoImport: {
      watchDependencies: Object.keys(packageJson.dependencies),
      webpack: {
        plugins: [new HokuleaAssetLoaderWebpackPlugin()]
      }
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true
    },

    cssModules: {
      plugins: postCSSPlugins
    }
  });

  return app.toTree();
};
