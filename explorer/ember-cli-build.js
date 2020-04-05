"use strict";

const EmberAddon = require("ember-cli/lib/broccoli/ember-addon");

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
    babel: {
      sourceMaps: "inline"
    },

    theemo: {
      defaultTheme: 'moana'
    }
  });

  return app.toTree();
};
