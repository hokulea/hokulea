import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components|Buttons'
};

const invokeHandler = action('button invoked');

export const button = () => {
  return {
    template: hbs`<Button {{invoke this.invokeButton}}>Button</Button> <Button disabled={{true}}>Disabled Button</Button>`,
    context: {
      invokeButton() {
        invokeHandler();
      }
    }
  };
};

button.story = {
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=106%3A9'
    }
  }
};
