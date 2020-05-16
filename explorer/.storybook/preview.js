import { addParameters, addDecorator } from "@storybook/ember";
import { withA11y } from "@storybook/addon-a11y";
import { hbs } from 'ember-cli-htmlbars';

const sortOrder = {
  'documentation': {
    top: ['getting started'],
    bottom: ['backstage']
  },
  'components': {},
  'api': {
    top: ['@hokulea／buttons', '@hokulea／inputs']
  }
};

const storyTop = ['introduction', 'overview'];
const storyBottom = [];

addParameters({
  options: {
    storySort: (a, b) => {
      // homoglyph renaming here
      a[1].kind = a[1].kind.replace(/@hokulea-(.+)/gi, '@hokulea／$1');
      b[1].kind = b[1].kind.replace(/@hokulea-(.+)/gi, '@hokulea／$1');

      // sorting starts here
      const rootA = a[1].kind.split('|')[0].toLowerCase();
      const rootB = b[1].kind.split('|')[0].toLowerCase();

      // sort by root
      if (rootA !== rootB) {
        for (const name of Object.keys(sortOrder)) {
          if (name === rootA) {
            return -1;
          }

          if (name === rootB) {
            return 1;
          }
        }
      }

      // sort by first level
      if (sortOrder[rootA]) {
        const folderA = a[1].kind.split('|').pop().toLowerCase();
        const folderB = b[1].kind.split('|').pop().toLowerCase();

        if (folderA !== folderB) {
          // top
          if (sortOrder[rootA].top) {
            for (const name of sortOrder[rootA].top) {
              if (name === folderA) {
                return -1;
              }

              if (name === folderB) {
                return 1;
              }
            }
          }

          // bottom
          if (sortOrder[rootA].bottom) {
            for (const name of sortOrder[rootA].bottom) {
              if (name === folderA) {
                return 1;
              }

              if (name === folderB) {
                return -1;
              }
            }
          }
        }
      }

      // story order

      // top
      for (const name of storyTop) {
        if (a[1].name.toLowerCase() === name) {
          return -1;
        }

        if (b[1].name.toLowerCase() === name) {
          return 1;
        }
      }

      // bottom
      for (const name of storyBottom) {
        if (a[1].name.toLowerCase() === name) {
          return 1;
        }

        if (b[1].name.toLowerCase() === name) {
          return -1;
        }
      }

      // alphabetical order
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    }
  }
});

addDecorator(withA11y);

export const globalArgTypes = {
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
    },
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
    },
  },
  direction: {
    name: 'Direction',
    description: 'direction for text',
    defaultValue: 'auto',
    toolbar: {
      icon: 'transfer',
      items: [
        'auto',
        'ltr',
        'rtl'
      ]
    },
  },
  writingMode: {
    name: 'Writing Mode',
    description: 'Writing Mode',
    defaultValue: 'horizontal-tb',
    toolbar: {
      icon: 'paragraph',
      items: [
        'horizontal-tb',
        'vertical-rl',
        'vertical-lr'
      ]
    },
  },
};

addDecorator((storyFn, { globalArgs }) => {
  return {
    template: hbs`<Storybook @globals={{this.globals}} @story={{this.story}}/>`,
    context: {
      globals: globalArgs,
      story: storyFn()
    },
  };
});
