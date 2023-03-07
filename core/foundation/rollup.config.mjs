import multiInput from "rollup-plugin-multi-input";
import commonjs from "@rollup/plugin-commonjs";
import hokuleaRollupPostcss from '@hokulea/rollup-plugin-postcss';
import css from 'rollup-plugin-css-only';
import { browsers as targets } from '@hokulea/config-targets';

const production = Boolean(process.env.ROLLUP_WATCH);
const development = !production;

export default [
  // Create Modules
  // --------------

  // ...for ESM
  {
    input: "./src/**/*.css",
    output: {
      dir: "dist"
    },
    plugins: [
      multiInput.default(),
      hokuleaRollupPostcss({
        targets,
        sourceMap: development,
        minify: production
      }),
    ],
  },

  // ...for CJS
  {
    input: "./src/**/*.css",
    output: {
      dir: "dist",
      format: "cjs",
      exports: "default",
      entryFileNames: '[name].cjs',
    },
    plugins: [
      multiInput.default(),
      hokuleaRollupPostcss({
        targets,
        sourceMap: development,
        minify: production
      }),
      commonjs()
    ],
  },

  // Create Styles
  // -------------

  // `foundation.css`
  {
    input: "./src/foundation.css",
    output: {
      dir: "dist"
    },
    plugins: [
      hokuleaRollupPostcss({
        targets,
        sourceMap: development,
        minify: production,
        output: 'foundation.css'
      })
    ],
  },

  // ... and combine them into `styles.css`
  {
    input: ['./dist/foundation.css'],
    output: {
      dir: 'dist'
    },
    plugins: [
      multiInput.default(),
      css({ output: 'index.css' })
    ]
  }
];
