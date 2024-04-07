'use strict';

const config = require('@hokulea/config-template-lint');

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    {
      files: ['tests/rendering/*.gts'],
      rules: {
        'require-mandatory-role-attributes': 'off'
      }
    }
  ]
};
