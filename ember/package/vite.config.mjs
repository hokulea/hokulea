import { classicEmberSupport, ember, extensions } from '@embroider/vite';

import { babel } from '@rollup/plugin-babel';
import { scopedCSS } from 'ember-scoped-css/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

import { theemo } from '@theemo/vite';

// For scenario testing
const isCompat = Boolean(process.env.ENABLE_COMPAT_BUILD);

export default defineConfig({
  define: {
    __CI__: JSON.stringify(process.env.CI === 'true')
  },
  resolve: {
    alias: [
      {
        find: '@hokulea/ember',
        replacement: `${import.meta.dirname}/src`
      }
    ]
  },
  plugins: [
    ...(isCompat ? [classicEmberSupport()] : []),
    ember(),
    scopedCSS({ layerName: 'app' }),
    babel({
      babelHelpers: 'inline',
      extensions
    }),
    theemo({
      defaultTheme: 'moana'
    }),
    icons({
      autoInstall: true,
      compiler: 'ember',
      customCollections: {
        custom: FileSystemIconLoader('./assets/icons')
      },
      // this is for testing purposes
      iconCustomizer(collection, icon, props) {
        props['data-name'] = `${collection}:${icon}`;
      }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        tests: 'tests/index.html',
        index: 'index.html'
      }
    }
  }
});
