'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { HOKULEA_CONFIG, HokuleaAssetLoaderWebpackPlugin } = require('@hokulea/ember/lib');
const hokuleaPostCSSConfig = require('@hokulea/config-postcss');
const packageJson = require('./package');

const sideWatch = require('@embroider/broccoli-side-watch');

const postCSSPlugins = hokuleaPostCSSConfig.plugins;
// const postCSSModulesIndex = hokuleaPostCSSConfig.plugins.indexOf(require('postcss-modules'));

// if (postCSSModulesIndex !== -1) {
//   postCSSPlugins.splice(postCSSModulesIndex, 1);
// }

// eslint-disable-next-line unicorn/no-anonymous-default-export
module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    trees: {
      app: sideWatch('app', { watching: ['../foundation/core/dist', '../foundation/tokens/dist'] })
    },

    babel: {
      // sourceMaps: 'inline',
      plugins: [require.resolve('ember-concurrency/async-arrow-task-transform')]
    },

    ...HOKULEA_CONFIG,

    svgJar: {
      sourceDirs: ['public/logos', 'public/icons']
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
