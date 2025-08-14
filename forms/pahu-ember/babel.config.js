import { babelCompatSupport, templateCompatSupport } from '@embroider/compat/babel';
import { buildMacros } from '@embroider/macros/babel';

const macros = buildMacros();

// For scenario testing
const compatBuild = Boolean(process.env.ENABLE_COMPAT_BUILD);

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
        transforms: [...(compatBuild ? templateCompatSupport() : macros.templateMacros)]
      }
    ],
    ...(compatBuild ? babelCompatSupport() : macros.babelMacros)
  ],

  generatorOpts: {
    compact: false
  }
};
