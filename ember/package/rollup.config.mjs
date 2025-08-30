import { Addon } from '@embroider/addon-dev/rollup';
import { resolve } from 'node:path';

import { babel } from '@rollup/plugin-babel';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist'
});

const configs = {
  babel: resolve(import.meta.dirname, './babel.publish.config.mjs'),
  ts: resolve(import.meta.dirname, './tsconfig.publish.json')
};

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),

  external: [
    '@glimmer/component',
    '@ember/component',
    '@ember/template-compilation',
    '@ember/test-helpers',
    '@hokulea/core',
    'ember-modifier',
    'ember-element-helper'
  ],

  plugins: [
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints([
      'index.js',
      'test-support/index.js',
      // from here on, it is only required for classic ember builds
      'template-registry.js',
      'components/box.js',
      'components/button.js',
      'components/card.js',
      'components/icon-button.js',
      'components/icon.js',
      'components/list.js',
      'components/menu.js',
      'components/text-input.js',
      'components/phone-input.js',
      'components/date-input.js',
      'components/number-input.js',
      'components/currency-input.js',
      'components/email-input.js',
      'components/password-input.js',
      'components/range-input.js',
      'components/section.js',
      'components/select.js',
      'components/radio.js',
      'components/checkbox.js',
      'components/input-builder.js',
      'components/tabs.js',
      'components/text-area.js',
      'components/form.js',
      'components/popover.js',
      // navigation
      'components/app-header.js',
      'components/navigation-list.js',
      // layouts
      'components/page.js',
      'components/focus-page.js',
      'components/sectioned-page.js',
      'helpers/popover.js',
      'services/-hokulea.js'
    ]),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports([
      'components/box.js',
      'components/button.js',
      'components/card.js',
      'components/icon-button.js',
      'components/icon.js',
      'components/list.js',
      'components/menu.js',
      'components/text-input.js',
      'components/phone-input.js',
      'components/date-input.js',
      'components/number-input.js',
      'components/currency-input.js',
      'components/email-input.js',
      'components/password-input.js',
      'components/range-input.js',
      'components/section.js',
      'components/select.js',
      'components/radio.js',
      'components/checkbox.js',
      'components/input-builder.js',
      'components/tabs.js',
      'components/text-area.js',
      'components/form.js',
      'components/popover.js',
      // navigation
      'components/app-header.js',
      'components/navigation-list.js',
      // layouts
      'components/page.js',
      'components/focus-page.js',
      'components/sectioned-page.js',
      'helpers/popover.js',
      'services/-hokulea.js'
    ]),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    // This babel config should *not* apply presets or compile away ES modules.
    // It exists only to provide development niceties for you, like automatic
    // template colocation.
    // compile TypeScript to latest JavaScript, including Babel transpilation
    babel({
      extensions: ['.js', '.gjs', '.ts', '.gts'],
      babelHelpers: 'bundled',
      configFile: configs.babel
    }),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

    // Ensure that .gjs files are properly integrated as Javascript
    addon.gjs({ inline_source_map: true }),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    // addon.hbs(),

    // Ensure that .gjs files are properly integrated as Javascript
    // addon.gjs(),

    // Emit .d.ts declaration files
    // apparently, running glint this way does something other than running
    // glint itself on the CLI. Manually running it generates the types
    // appropriately. Running it as param here will produce broken declarations
    // It strips the `.gts` from the imports.
    addon.declarations('declarations', `glint --declaration --project ${configs.ts}`),

    // addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    // addon.keepAssets(['**/*.css']),

    // Remove leftover build artifacts when starting a new build.
    addon.clean()
  ]
};
