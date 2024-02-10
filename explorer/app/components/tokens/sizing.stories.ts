import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Tokens/Sizing',
  component: '',
  parameters: {
    options: {
      showPanel: true,
      showToolbar: true
    }
  }
};

export const Sizing = () => ({
  template: hbs`<Tokens::Sizing/>`
});
