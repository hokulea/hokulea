import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Tokens/Intents',
  component: '',
  parameters: {
    options: {
      showPanel: true,
      showToolbar: true
    }
  }
};

export const Intents = () => ({
  template: hbs`<Tokens::Intents/>`
});
