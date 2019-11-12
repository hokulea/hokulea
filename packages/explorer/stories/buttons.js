import hbs from 'htmlbars-inline-precompile';
import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Buttons/Button'
};

const invokeHandler = action('button invoked');

export const button = () => {
  return {
    template: hbs`<Button {{invoke this.invokeButton}}>Hello Button</Button>`,
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
        'https://www.figma.com/file/NBRA9YdDjwP3VG8jnKp5VV/Components?node-id=1%3A2'
    }
  }
};
