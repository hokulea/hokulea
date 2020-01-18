import { addParameters, addDecorator } from "@storybook/ember";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";
import { withA11y } from "@storybook/addon-a11y";
import hbs from "htmlbars-inline-precompile";

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
    iframeHeight: "auto"
  }
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
