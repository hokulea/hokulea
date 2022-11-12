import multiInput from 'rollup-plugin-multi-input';
import postcss from 'rollup-plugin-postcss';
import { rollup } from '@hokulea/config-postcss';
import commonjs from '@rollup/plugin-commonjs';

const development = Boolean(process.env.ROLLUP_WATCH);
const production = !development;

export default [
  {
    input: './src/**/*.css',
    output: {
      dir: 'dist'
    },
    plugins: [multiInput(), postcss(rollup({ minify: production }))]
  },
  {
    input: './src/**/*.css',
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      exports: 'default'
    },
    plugins: [multiInput(), postcss(rollup({ minify: production })), commonjs()]
  }
];
