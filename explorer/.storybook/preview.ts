import { hbs } from 'ember-cli-htmlbars';

const preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Documentation',
          [
            'Getting Started',
            ['Introduction'],
            'Foundation',
            ['Introduction'],
            'Guides',
            '*',
            'Backstage'
          ],
          'Components',
          'Tokens',
          '*'
        ]
      }
    }
  },
  decorators: [
    (storyFn, { globals }) => {
      return {
        template: hbs`<Storybook @globals={{this.globals}} @story={{this.story}}/>`,
        context: {
          globals,
          story: storyFn()
        }
      };
    }
  ],

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'moana',
      toolbar: {
        icon: 'cog',
        items: [
          { value: 'moana', title: 'Moana' },
          { value: 'vaomatua', title: 'Vaomatua' }
        ]
      }
    },
    scheme: {
      name: 'Color Scheme',
      description: 'Color scheme for selected Theme',
      defaultValue: 'system',
      toolbar: {
        icon: 'eye',
        items: [
          { value: 'system', title: 'System' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ]
      }
    },
    density: {
      name: 'Density',
      description: 'Density of the UI',
      defaultValue: 'default',
      toolbar: {
        icon: 'filter',
        items: [
          { value: 'compact', title: 'Compact' },
          { value: 'default', title: 'Default' },
          { value: 'comfortable', title: 'Comfortable' }
        ]
      }
    },
    direction: {
      name: 'Direction',
      description: 'direction for text',
      defaultValue: 'auto',
      toolbar: {
        icon: 'transfer',
        items: ['auto', 'ltr', 'rtl']
      }
    },
    writingMode: {
      name: 'Writing Mode',
      description: 'Writing Mode',
      defaultValue: 'horizontal-tb',
      toolbar: {
        icon: 'paragraph',
        items: ['horizontal-tb', 'vertical-rl', 'vertical-lr']
      }
    }
  }
};

export default preview;
