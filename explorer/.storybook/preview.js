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

const sortOrder = [
  'Documentation|Getting Started/Introduction',
  'Documentation|Getting Started',
  'Documentation|Foundation/Introduction'
];

addParameters({
  options: {
    storySort: (a, b) => {
      // special order
      for (const name of sortOrder) {
        if (a[1].kind.startsWith(name)) {
          return -1;
        }

        if (b[1].kind.startsWith(name)) {
          return 1;
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
