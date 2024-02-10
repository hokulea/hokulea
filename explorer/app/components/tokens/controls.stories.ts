import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Tokens/Controls',
  component: '',
  parameters: {
    options: {
      showPanel: true,
      showToolbar: true
    }
  }
};

export const Controls = () => ({
  template: hbs`<Tokens::Controls/>`
});
