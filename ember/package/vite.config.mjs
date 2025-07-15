import { classicEmberSupport, ember, extensions } from '@embroider/vite';

import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vite';

// For scenario testing
const isCompat = Boolean(process.env.ENABLE_COMPAT_BUILD);

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@hokulea/ember',
        replacement: `${import.meta.dirname}/src`
      },
      {
        find: /^ember-svg-jar\/(.*)/,
        replacement: `${import.meta.dirname}/node_modules/mber-svg-jar/addon/$1.js`
      }
    ]
  },
  plugins: [
    ...(isCompat ? [classicEmberSupport()] : []),
    ember(),
    babel({
      babelHelpers: 'inline',
      extensions
    })
  ],
  build: {
    rollupOptions: {
      input: {
        tests: 'tests/index.html'
      }
    }
  }
});
