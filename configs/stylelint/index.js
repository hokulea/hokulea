'use strict';

const { browsers } = require('@hokulea/config-targets');
const configure = require('@gossi/config-stylelint/configure');

const config = configure({ browsers });

const rules = config.rules;

delete rules['order/properties-order'];

module.exports = {
  ...config,
  extends: [...config.extends, 'stylelint-config-clean-order'],
  rules: {
    ...rules,
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
