'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const theemoPlugin = require('ember-theemo/lib/webpack');
const packageJson = require('./package');
const sideWatch = require('@embroider/broccoli-side-watch');
const { GlimmerScopedCSSWebpackPlugin } = require('glimmer-scoped-css/webpack');
const icons = require('unplugin-icons/webpack');
const { FileSystemIconLoader } = require('unplugin-icons/loaders');

const iconCollection = {
  custom: FileSystemIconLoader('./assets/icons')
};
const iconify = icons({
  autoInstall: true,
  compiler: 'ember',
  customCollections: iconCollection,
  // this is for testing purposes
  iconCustomizer(collection, icon, props) {
    props['data-name'] = `${collection}:${icon}`;
  }
});

// eslint-disable-next-line unicorn/no-anonymous-default-export
module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    trees: {
      app: sideWatch('app', {
        watching: [
          '../package/dist',
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
      sourceDirs: ['public/icons'],
      optimizer: false
    },

    autoImport: {
      watchDependencies: Object.keys(packageJson.dependencies),
      webpack: {
        plugins: [new GlimmerScopedCSSWebpackPlugin(), iconify]
      }
    },
    theemo: {
      defaultTheme: 'moana'
    }

    // Turns out prember (and or `ember-cli-fastboot`) has some issues with
    // `glimmer-scoped-css`, that forces me to deactivate this:
    // https://github.com/cardstack/glimmer-scoped-css/issues/25
    //
    // prember: {
    //   urls: ['/', '/actions', '/content', '/controls', '/controls/composites', '/forms', '/icons']
    // }
  });

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app, {
    packagerOptions: {
      webpackConfig: {
        plugins: [theemoPlugin(), new GlimmerScopedCSSWebpackPlugin(), iconify]
      }
    }
  });
};
