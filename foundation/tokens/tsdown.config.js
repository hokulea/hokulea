import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src'],
  format: ['esm', 'cjs'],
  dts: true
});
