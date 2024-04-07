'use strict';

module.exports = {
  ...require('@gossi/config-template-lint'),
  overrides: [
    {
      files: ['tests/rendering/**/*.gts'],
      rules: {
        'require-mandatory-role-attributes': false
      }
    }
  ]
};
