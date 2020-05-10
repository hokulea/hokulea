'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  const app = new EmberAddon(defaults, {
    // Add options here
    babel: {
      sourceMaps: 'inline'
    },

    theemo: {
      defaultTheme: 'moana'
    }
  });

  app.import('node_modules/highlight.js/styles/agate.css');

  return app.toTree();
};
