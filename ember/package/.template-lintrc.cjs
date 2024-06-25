'use strict';

const config = require('@hokulea/config-template-lint');

module.exports = {
  ...config,

  rules: {
    ...config.rules,
    'no-negated-condition': false
  }
};
