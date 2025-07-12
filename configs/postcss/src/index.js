import each from 'postcss-each';
import lightning from 'postcss-lightningcss';
import presetEnv from 'postcss-preset-env';

import { browsers } from '@gossi/config-targets';

function plugins({ minify }) {
  return [
    // https://www.npmjs.com/package/postcss-each
    // adds @each construct
    each,

    // https://github.com/csstools/postcss-preset-env
    // Adds vendor prefixes based on Can I Use and polyfills new features
    // Inspired by https://github.com/moxystudio/postcss-preset-moxy/blob/master/index.js
    presetEnv({
      browsers,

      // https://cssdb.org/
      stage: 2,

      features: {
        'custom-selectors': true
      },

      // Disable `preserve` so that the resulting CSS is consistent among all
      // browsers, diminishing the probability of discovering bugs only when
      // testing in older browsers.
      preserve: false,

      // Explicitly enable features that we want, despite being proposals yet.
      // features: {
      //   'custom-properties': true,
      //   'custom-media-queries': true,
      //   'nesting-rules': true,
      //   'pseudo-class-any-link': true
      // },

      autoprefixer: {
        // We don't manually apply prefixes unless they are really necessary,
        // e.g.when dealing with quirks, therefore we disable removing them.
        remove: false
      }
    }),
    lightning({
      minify
    })
  ];
}

export { plugins };
