'use strict';

const { configs } = require('@hokulea/config-eslint');

const config = configs.ember();

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    {
      ...configs.nodeCJS().overrides[0],
      files: ['lib/*.js']
    }
  ]
};
