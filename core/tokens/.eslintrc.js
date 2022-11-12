'use strict';

const { configs } = require('@hokulea/config-eslint');

const node = configs.node();
const ts = configs.nodeTS();
const base = configs.nodeCJS();

delete node.root;
delete ts.root;

module.exports = {
  ...base,
  overrides: [
    ...base.overrides,
    {
      ...ts,
      files: ['src/**/*.ts']
    }
  ]
};
