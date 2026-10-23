// import emberCliCodeCoverage from 'ember-cli-code-coverage';
import emberConcurrency from 'ember-concurrency/async-arrow-task-transform';

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
        targetFormat: 'hbs',
        transforms: []
      }
    ],
    emberConcurrency,
    [
      'module:decorator-transforms',
      {
        runtime: {
          import: 'decorator-transforms/runtime-esm'
        }
      }
    ]
    // ...emberCliCodeCoverage.buildBabelPlugin()
  ],

  generatorOpts: {
    compact: false
  }
};
