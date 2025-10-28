import { babelCompatSupport, templateCompatSupport } from '@embroider/compat/babel';
import { buildMacros } from '@embroider/macros/babel';
import { fileURLToPath } from 'node:url';

import emberCliCodeCoverage from 'ember-cli-code-coverage';
import emberConcurrency from 'ember-concurrency/async-arrow-task-transform';
import * as scopedCSS from 'ember-scoped-css/build';

const macros = buildMacros();

// For scenario testing
const compatBuild = Boolean(process.env.ENABLE_COMPAT_BUILD);
const coverageBuild = Boolean(process.env.COVERAGE);

export default {
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        allExtensions: true,
        allowDeclareFields: true,
        onlyRemoveTypeImports: true
      }
    ],
    [
      'babel-plugin-ember-template-compilation',
      {
        transforms: [
          ...(compatBuild ? templateCompatSupport() : macros.templateMacros),
          scopedCSS.templatePlugin({
            layerName: 'app'
          })
        ]
      }
    ],
    emberConcurrency,
    [
      'module:decorator-transforms',
      {
        runtime: {
          import: fileURLToPath(import.meta.resolve('decorator-transforms/runtime-esm'))
        }
      }
    ],
    ...(compatBuild ? babelCompatSupport() : macros.babelMacros),
    ...(coverageBuild ? emberCliCodeCoverage.buildBabelPlugin() : [])
  ],

  generatorOpts: {
    compact: false
  }
};
