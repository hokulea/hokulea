'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const {
  HOKULEA_CONFIG,
  HOKULEA_ICON_PATH,
  HokuleaAssetLoaderWebpackPlugin
} = require('@hokulea/ember/lib');
const hokuleaPostCSSConfig = require('@hokulea/config-postcss');
const packageJson = require('./package');

const sideWatch = require('@embroider/broccoli-side-watch');
const postCSSPlugins = hokuleaPostCSSConfig.plugins;
const postCSSModulesIndex = hokuleaPostCSSConfig.plugins.indexOf(require('postcss-modules'));

if (postCSSModulesIndex !== -1) {
  postCSSPlugins.splice(postCSSModulesIndex, 1);
}

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    trees: {
      app: sideWatch('app', { watching: ['../foundation/core/dist', '../foundation/tokens/dist'] })
    },

    babel: {
      sourceMaps: 'inline'
    },

    ...HOKULEA_CONFIG,

    svgJar: {
      sourceDirs: ['public/logos', HOKULEA_ICON_PATH]
    },

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
