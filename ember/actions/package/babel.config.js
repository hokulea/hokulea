'use strict';

module.exports = {
  presets: ['@babel/preset-typescript'],
  plugins: [
    '@hokulea/ember-template-imports/babel-plugin',
    '@embroider/addon-dev/template-colocation-plugin',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties'
    // ['@babel/plugin-transform-runtime', { absoluteRuntime: true }]
  ]
};
