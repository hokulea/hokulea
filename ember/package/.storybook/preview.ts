import { themes } from 'storybook/theming';

import App from '#app/app';

import '@hokulea/core/style.css';

import type { Preview } from 'ember-storybook';

const preview: Preview = {
  parameters: {
    docs: {
      codePanel: true,
      theme: themes.dark
    },
    ember: {
      app: App
    }
  },

  tags: ['vitest', 'autodocs']
};

export default preview;
