import multiInput from 'rollup-plugin-multi-input';
import hokuleaRollupPostcss from '@hokulea/rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import { browsers as targets } from '@hokulea/config-targets';

const production = Boolean(process.env.ROLLUP_WATCH);
const development = !production;

export default [
  {
    input: './src/**/*.css',
    output: {
      dir: 'dist'
    },
    plugins: [
      multiInput.default(),
      hokuleaRollupPostcss({
        targets,
        sourceMap: development,
        minify: production
      })
    ]
  },
  {
    input: './src/**/*.css',
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
    ]
  }
];
