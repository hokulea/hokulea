import { hbs } from 'ember-cli-htmlbars';

type SortOrder = {
  [key: string]: {
    top?: string[];
    bottom?: string[];
  };
};

const sortOrder: SortOrder = {
  documentation: {
    top: ['getting started', 'foundation', 'guides'],
    bottom: ['development', 'backstage']
  },
  components: {},
  'components/buttons': {
    top: ['button', 'alternative', 'highlight', 'danger']
  },
  tokens: {},
  api: {
    top: ['@hokulea／buttons', '@hokulea／inputs']
  }
};

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
      // storySort: (a, b) => {
      //   // sorting starts here
      //   const rootA = a[1].kind.split('/')[0].toLowerCase();
      //   const rootB = b[1].kind.split('/')[0].toLowerCase();

      //   // sort by root
      //   if (rootA !== rootB) {
      //     for (const name of Object.keys(sortOrder)) {
      //       if (name === rootA) {
      //         return -1;
      //       }

      //       if (name === rootB) {
      //         return 1;
      //       }
      //     }
      //   }

      //   // sort by first level
      //   if (sortOrder[rootA]) {
      //     const folderA = a[1].kind.split('/').slice(1).join('/').toLowerCase();
      //     const folderB = b[1].kind.split('/').slice(1).join('/').toLowerCase();

      //     if (folderA !== folderB) {
      //       // top
      //       if (sortOrder[rootA].top) {
      //         for (const name of sortOrder[rootA].top) {
      //           if (name === folderA) {
      //             return -1;
      //           }

      //           if (name === folderB) {
      //             return 1;
      //           }
      //         }
      //       }

      //       // bottom
      //       if (sortOrder[rootA].bottom) {
      //         for (const name of sortOrder[rootA].bottom) {
      //           if (name === folderA) {
      //             return 1;
      //           }

      //           if (name === folderB) {
      //             return -1;
      //           }
      //         }
      //       }
      //     }
      //   }

      //   // story order

      //   // top
      //   for (const name of storyTop) {
      //     if (a[1].name.toLowerCase() === name) {
      //       return -1;
      //     }

      //     if (b[1].name.toLowerCase() === name) {
      //       return 1;
      //     }
      //   }

      //   // bottom
      //   for (const name of storyBottom) {
      //     if (a[1].name.toLowerCase() === name) {
      //       return 1;
      //     }

      //     if (b[1].name.toLowerCase() === name) {
      //       return -1;
      //     }
      //   }

      //   // alphabetical order
      //   return a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
      // }
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
