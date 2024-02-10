// import ts from 'rollup-plugin-ts';
// import { Addon } from '@embroider/addon-dev/rollup';
// import { browsers as targets } from '@gossi/config-targets';

import { Addon } from '@embroider/addon-dev/rollup';

import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import { glimmerTemplateTag } from 'rollup-plugin-glimmer-template-tag';

const development = Boolean(process.env.ROLLUP_WATCH);
const production = !development;

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist'
});

// Add extensions here, such as ts, gjs, etc that you may import
const extensions = ['.js', '.ts'];

export default defineConfig({
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),

  plugins: [
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints(['index.ts', 'components/**/!(*.stories).ts', 'modifiers/**/*.ts']),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports(['components/**/*.{js,ts}', 'modifiers/**/*.{js,ts}']),

    glimmerTemplateTag(),

    // Allows rollup to resolve imports of files with the specified extensions
    nodeResolve({ extensions }),

    // compile TypeScript to latest JavaScript, including Babel transpilation
    babel({
      extensions,
      babelHelpers: 'bundled',
      skipPreflightCheck: true
    }),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

    // addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    // addon.keepAssets(['**/*.css']),

    // Remove leftover build artifacts when starting a new build.
    addon.clean()
  ]
});
