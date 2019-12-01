import { configure, addParameters, addDecorator } from "@storybook/ember";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";
import { withA11y } from "@storybook/addon-a11y";

addDecorator(withA11y);

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
});

const loadStories = () => {
  const req = require.context("../../", true, /stories\/.*\.(js|mdx)$/);
  // const req = require.context('../stories', true, /\.js$/);

  return [
    // require.context('../node_modules/@hokulea/buttons/stories', true, /\.js$/)
    // require.context('../../buttons/stories', true, /\.js$/)
    ...req
      .keys()
      .map(name => req(name))
      .filter(exp => !!exp.default)
  ];
};

configure(loadStories, module);
