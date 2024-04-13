'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const packageJson = require('./package');
const sideWatch = require('@embroider/broccoli-side-watch');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    trees: {
      app: sideWatch('app', {
        watching: ['../../aria-navigator/dist', '../../ember-aria-navigator/package/dist']
      })
    },

    autoImport: {
      watchDependencies: Object.keys(packageJson.dependencies)
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app);
  // return app.toTree();
};
