import { addParameters, addDecorator } from "@storybook/ember";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";
import { withA11y } from "@storybook/addon-a11y";
import { hbs } from 'ember-cli-htmlbars';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
    iframeHeight: "auto"
  }
});

const sortOrder = {
  'documentation': {
    top: ['getting started'],
    bottom: ['backstage']
  }
}

const storyTop = ['introduction'];
const storyBottom = [];

addParameters({
  options: {
    storySort: (a, b) => {
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
  },
});

addDecorator(withA11y);

// storybook wrapper
addDecorator(storyFn => {
  const { template, context } = storyFn();

  return {
    context: {
      template,
      context,
      get layout() {
        return hbs`<Storybook @parent={{this}}/>`;
      }
    }
  };
});
