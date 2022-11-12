import multiInput from "rollup-plugin-multi-input";
import postcss from "rollup-plugin-postcss";
import { rollup } from "@hokulea/config-postcss";
import commonjs from "@rollup/plugin-commonjs";
import css from 'rollup-plugin-css-only';

const development = Boolean(process.env.ROLLUP_WATCH);
const production = !development;

export default [
  // Create Modules
  // --------------

  // ...for ESM
  {
    input: "./src/**/*.css",
    output: {
      dir: "dist"
    },
    plugins: [multiInput(), postcss(rollup({ minify: production}))],
  },

  // ...for CJS
  {
    input: "./src/**/*.css",
    output: {
      dir: "dist/cjs",
      format: "cjs",
      exports: "default",
    },
    plugins: [
      multiInput(),
      postcss(rollup({ minify: production })),
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
    plugins: [postcss({...rollup({ minify: production }), extract: 'foundation.css'})],
  },

  // `tiles.css`
  {
    input: "./src/tiles.css",
    output: {
      dir: "dist"
    },
    plugins: [postcss({...rollup({ minify: production }), extract: 'tiles.css'})],
  },

  // `controls.css`
  {
    input: "./src/controls.css",
    output: {
      dir: "dist"
    },
    plugins: [postcss({...rollup({ minify: production }), extract: 'controls.css'})],
  },

  // ... and combine them into `styles.css`
  {
    input: ['./dist/controls.css', './dist/foundation.css', './dist/tiles.css'],
    output: {
      dir: 'dist'
    },
    plugins: [multiInput(), css({ output: 'styles.css' })]
  }
];
