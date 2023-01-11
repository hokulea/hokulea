'use strict';

const { browsers } = require('@hokulea/config-targets');
const configure = require('@gossi/config-stylelint/configure');

const config = configure({ browsers });

module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['$']
      }
    ]
  }
};
