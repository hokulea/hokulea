'use strict';

const config = require('@hokulea/config-stylelint');

module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          ...config.rules['property-no-unknown'][1].ignoreProperties
          // 'anchor-name'
        ]
      }
    ]
  }
};
