/// <reference types="vitest" />

import { resolve } from 'node:path';

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'aria-navigator',
      // the proper extensions will be added
      fileName: 'index'
    }
  },
  test: {
    open: false,
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['text', 'html', 'clover', 'json']
    },
    browser: {
      enabled: true,
      // enableUI: true,
      headless: true,
      name: 'chrome'
      // provider: 'none'
    }
  }
});
