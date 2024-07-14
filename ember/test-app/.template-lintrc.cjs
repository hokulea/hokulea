'use strict';

const config = require('@hokulea/config-template-lint');

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    {
      files: ['**/*.gts'],
      rules: {
        'no-forbidden-elements': ['meta', 'html', 'script']
      }
    },
    {
      files: ['tests/rendering/*.gts'],
      rules: {
        'require-mandatory-role-attributes': 'off'
      }
    }
  ]
};
