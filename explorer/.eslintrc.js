'use strict';
'use strict';

const { configs } = require('@hokulea/config-eslint');

module.exports = configs.ember();

// module.exports = {
//   root: true,
//   parser: 'babel-eslint',
//   parserOptions: {
//     ecmaVersion: 2018,
//     sourceType: 'module',
//     ecmaFeatures: {
//       legacyDecorators: true,
//     },
//   },
//   plugins: ['ember'],
//   extends: [
//     'eslint:recommended',
//     'plugin:ember/recommended',
//     'plugin:prettier/recommended',
//     'plugin:storybook/recommended',
//   ],
//   env: {
//     browser: true,
//   },
//   rules: {},
//   overrides: [
//     // node files
//     {
//       files: [
//         '.eslintrc.js',
//         '.prettierrc.js',
//         '.template-lintrc.js',
//         'ember-cli-build.js',
//         'testem.js',
//         'blueprints/*/index.js',
//         'config/**/*.js',
//         'lib/*/index.js',
//         'server/**/*.js',
//       ],
//       parserOptions: {
//         sourceType: 'script',
//       },
//       env: {
//         browser: false,
//         node: true,
//       },
//       plugins: ['node'],
//       extends: ['plugin:node/recommended'],
//       rules: {
//         // this can be removed once the following is fixed
//         // https://github.com/mysticatea/eslint-plugin-node/issues/77
//         'node/no-unpublished-require': 'off',
//       },
//     },
//   ],
// };
