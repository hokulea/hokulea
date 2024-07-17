'use strict';

module.exports = {
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      { allExtensions: true, onlyRemoveTypeImports: true, allowDeclareFields: true }
    ],
    '@embroider/addon-dev/template-colocation-plugin',
    [
      'babel-plugin-ember-template-compilation',
      {
        targetFormat: 'hbs',
        transforms: []
      }
    ],
    require.resolve('ember-concurrency/async-arrow-task-transform'),
    ['module:decorator-transforms', { runtime: { import: 'decorator-transforms/runtime' } }],
    ...require('ember-cli-code-coverage').buildBabelPlugin()
  ]
};
