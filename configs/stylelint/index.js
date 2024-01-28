'use strict';

const { browsers } = require('@hokulea/config-targets');
const configure = require('@gossi/config-stylelint/configure');

const config = configure({ browsers });

module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['each']
      }
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['$']
      }
    ],
    'import-notation': 'string'
  }
};
