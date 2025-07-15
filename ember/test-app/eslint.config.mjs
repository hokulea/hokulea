import ember from '@gossi/config-eslint/ember';

export default [
  ...ember(import.meta.dirname),
  {
    files: ['**/*.gts'],
    rules: {
      'unicorn/consistent-function-scoping': 'off'
    }
  }
];
