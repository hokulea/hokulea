import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Tokens/Indicators',
  component: '',
  parameters: {
    options: {
      showPanel: true,
      showToolbar: true
    }
  }
};

export const Indicators = () => ({
  template: hbs`<Tokens::Indicators/>`
});
