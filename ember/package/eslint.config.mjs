import storybook from 'eslint-plugin-storybook';

import ember from '@gossi/config-eslint/ember';

export default [
  {
    ignores: ['lib/']
  },
  ...ember(import.meta.dirname),
  {
    files: ['**/*.gts'],
    rules: {
      'unicorn/consistent-function-scoping': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off'
    }
  },
  ...storybook.configs['flat/recommended'],
  ...storybook.configs['flat/csf']
];
