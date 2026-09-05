import type { StorybookConfig } from 'ember-storybook';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.gts'],

  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y'
    // '@storybook/addon-vitest'
  ],

  framework: {
    name: 'ember-storybook',
    options: {}
  },

  features: {},

  core: {
    disableWhatsNewNotifications: true
  },

  previewHead: (head) => `
    ${head}

    <style>
      /* explicitly set monospace font stack to workaround inconsistent fonts in Chromatic */
      pre, code, kbd, samp {
        font-family:
          ui-monospace,
          Menlo,
          Monaco,
          "Cascadia Mono",
          "Segoe UI Mono",
          "Roboto Mono",
          "Oxygen Mono",
          "Ubuntu Monospace",
          "Source Code Pro",
          "Fira Mono",
          "Droid Sans Mono",
          "Courier New",
          monospace;
      }
    </style>
  `
};

export default config;
