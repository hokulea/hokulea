'use strict';

const { browsers } = require('@hokulea/config-targets');
const config = require('@gossi/config-stylelint');

module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers,
        ignore: [
          // grid-template-columns falsely identified as multicolumn
          'multicolumn'
        ]
      }
    ]
  }
};
