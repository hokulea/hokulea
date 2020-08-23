module.exports = {
  root: true,
  extends: '@clark/ember-typescript',
  overrides: [
    {
      files: '**/*stories.ts',
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase']
          }
        ]
      }
    }
  ]
};
