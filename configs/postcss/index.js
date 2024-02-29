const { browsers } = require('@hokulea/config-targets');

const plugins = [
  // https://www.npmjs.com/package/postcss-each
  // adds @each construct
  require('postcss-each'),

  // https://github.com/csstools/postcss-preset-env
  // Adds vendor prefixes based on Can I Use and polyfills new features
  // Inspired by https://github.com/moxystudio/postcss-preset-moxy/blob/master/index.js
  require('postcss-preset-env')({
    browsers,

    // https://cssdb.org/
    stage: 2,

    features: {
      'custom-selectors': true
      // 'nesting-rules': true
    },

    // Disable `preserve` so that the resulting CSS is consistent among all
    // browsers, diminishing the probability of discovering bugs only when
    // testing in older browsers.
    preserve: false,

    autoprefixer: {
      // We don't manually apply prefixes unless they are really necessary,
      // e.g.when dealing with quirks, therefore we disable removing them.
      remove: false
    }
  }),

  require('postcss-modules')
];

module.exports = {
  plugins
};
