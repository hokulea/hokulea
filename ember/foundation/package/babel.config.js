'use strict';

module.exports = {
  presets: ['@babel/preset-typescript'],
  plugins: [
    '@embroider/addon-dev/template-colocation-plugin',
    [
      'babel-plugin-ember-template-compilation',
      {
        targetFormat: 'hbs',
        compilerPath: 'ember-source/dist/ember-template-compiler'
      }
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-transform-runtime', { absoluteRuntime: true }]
  ]
};
