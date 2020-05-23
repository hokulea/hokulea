import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components|Cards/Card',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = () => {
  return {
    template: hbs`
      <Card>
        Sample Card Content
      </Card>
    `
  };
};

export const Builder = () => {
  return {
    template: hbs`
    <Card>
      <:header>Card Title</:header>
      <:content>Sample Card Content</:content>
      <:footer>Footer</:footer>
    </Card>
    `
  };
};
