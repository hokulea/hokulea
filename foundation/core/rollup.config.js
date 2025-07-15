import commonjs from '@rollup/plugin-commonjs';
import fg from 'fast-glob';
import css from 'rollup-plugin-css-only';
// import del from 'rollup-plugin-delete';
import multiInput from 'rollup-plugin-multi-input';

import { browsers as targets } from '@gossi/config-targets';
import hokuleaRollupPostcss from '@hokulea/rollup-plugin-postcss';

const production = Boolean(process.env.HOKULEA_RELEASE);
const development = !production;

export default [
  // Step 1:
  // Create Modules
  // --------------

  // at this step the hashes will be made, this needs to go into step two

  // ...for ESM
  {
    // eslint-disable-next-line import-x/no-named-as-default-member
    input: fg.globSync('./src/!(foundation).css'),
    output: {
      dir: 'dist',
      entryFileNames: '[name].css.js'
    },
    plugins: [
      multiInput.default(),
      hokuleaRollupPostcss({
        targets,
        sourceMap: development,
        minify: production,
        output: 'dist/topics.css'
      })
    ]
  },

  // ...for CJS
  {
    // eslint-disable-next-line import-x/no-named-as-default-member
    input: fg.globSync('./src/!(foundation).css'),
    output: {
      dir: 'dist',
      format: 'cjs',
      exports: 'default',
      entryFileNames: '[name].css.cjs'
    },
    plugins: [
      multiInput.default(),
      hokuleaRollupPostcss({
        targets,
        sourceMap: development,
        minify: production,
        output: false
      }),
      commonjs()
    ]
  },

  // Step 2:
  // Create Styles + Combine them
  // -------------

  // `foundation.css`
  // this runs our postcss config to "compile" the foundation
  {
    input: './src/foundation.css',
    output: {
      dir: 'dist'
    },
    plugins: [
      hokuleaRollupPostcss({
        targets,
        sourceMap: development,
        minify: production,
        output: 'dist/foundation.css'
      })
    ]
  },

  // ... and combine them into `index.css`
  {
    input: ['./dist/dist/foundation.css', './dist/dist/topics.css'],
    output: {
      dir: 'dist'
    },
    plugins: [
      multiInput.default(),
      css({ output: 'index.css' })
      // del({ targets: ['dist/dist', 'dist/foundation.js'], hook: 'closeBundle', runOnce: true })
    ]
  }
];
