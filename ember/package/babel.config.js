'use strict';

// module.exports = {
//   presets: ['@babel/preset-typescript'],
//   plugins: [
//     'ember-template-imports/src/babel-plugin',
//     '@embroider/addon-dev/template-colocation-plugin',
//     ['@babel/plugin-proposal-decorators', { legacy: true }],
//     '@babel/plugin-proposal-class-properties'
//   ]
// };

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
    ['module:decorator-transforms', { runtime: { import: 'decorator-transforms/runtime' } }]
  ]
};
