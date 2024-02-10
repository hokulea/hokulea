'use strict';

const config = require('@gossi/config-template-lint');

module.exports = {
  ...config,
  rules: {
    ...(config.rules || {}),
    'no-passed-in-event-handlers': {
      ignore: {
        Form: ['submit', 'reset']
      }
    },
    'require-valid-named-block-naming-format': 'kebab-case'
  },
  overrides: [
    ...config.overrides,
    {
      files: ['**/stories.ts', '**/*.stories.ts'],
      rules: {
        'no-inline-styles': false
      }
    }
  ]
};
