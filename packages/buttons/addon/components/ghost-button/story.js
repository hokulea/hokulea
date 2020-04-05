import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components|Buttons'
};

const invokeHandler = action('button invoked');

export const ghost = () => {
  return {
    template: hbs`<GhostButton {{invoke this.invokeButton}}>Ghost Button</GhostButton> <GhostButton disabled={{true}}>Disabled Ghost Button</GhostButton>`,
    context: {
      invokeButton() {
        invokeHandler();
      }
    }
  };
};

ghost.story = {
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=123%3A9'
    }
  }
};
