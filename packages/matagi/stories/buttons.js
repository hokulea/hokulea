import hbs from 'htmlbars-inline-precompile';
import { action } from '@storybook/addon-actions';

export default { title: 'Buttons/Button' };

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
