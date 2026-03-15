import ember from '@gossi/config-eslint/ember';

export default [
  ...ember(import.meta.dirname),
  {
    ignores: ['./tests/acceptance/a11y-test.ts']
  },
  {
    files: ['**/*.gts'],
    rules: {
      'unicorn/consistent-function-scoping': 'off'
    }
  }
];
