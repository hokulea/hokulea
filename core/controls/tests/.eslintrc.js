module.exports = {
  root: true,
  extends: '@clark/ember-typescript/test',
  overrides: [
    {
      files: '**/*-test.ts',
      rules: {
        'prefer-arrow-callback': 'off'
      }
    }
  ]
};
