'use strict';

const { configs } = require('@hokulea/config-eslint');

// const node = configs.node();
const cjs = configs.nodeCJS();
const esm = configs.nodeESM();
const base = configs.ember();

// delete node.root;
delete cjs.root;
delete esm.root;

module.exports = {
  ...base,
  overrides: [
    ...base.overrides,
    {
      ...esm,
      files: ['.storybook/manager.js', '.storybook/_preview.js']
    },
    {
      ...cjs,
      files: ['.storybook/**/*.js']
    }
  ]
};
