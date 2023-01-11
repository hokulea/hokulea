import ts from 'rollup-plugin-ts';
import postcss from 'rollup-plugin-postcss';
import { rollup as postcssRollup } from '@hokulea/config-postcss';
import { Addon } from '@embroider/addon-dev/rollup';
import { targets } from '@hokulea/config-targets';

const development = Boolean(process.env.ROLLUP_WATCH);
const production = !development;

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist'
});

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: {
    ...addon.output(),
    hoistTransitiveImports: false
  },

  plugins: [
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints(['components/**/!(stories).ts']),

    postcss(postcssRollup({ minify: production })),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports(['components/**/*.{js,ts}']),

    // This babel config should *not* apply presets or compile away ES modules.
    // It exists only to provide development niceties for you, like automatic
    // template colocation.
    //
    // By default, this will load the actual babel config from the file
    // babel.config.json.
    ts({
      // can be changed to swc or other transpilers later
      // but we need the ember plugins converted first
      // (template compilation and co-location)
      transpiler: 'babel',
      browserslist: targets
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
};
