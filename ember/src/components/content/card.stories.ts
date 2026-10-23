import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components/Content/Card',
  component: 'Card',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  },
  controls: { hideNoControlsWarning: true }
};

export const Default = () => ({
  template: hbs`
      <Card>
        Sample Card Content
      </Card>
    `
});

export const Builder = () => ({
  template: hbs`
    <Card>
      <:header>Card Title</:header>
      <:body>Sample Card Content</:body>
      <:footer>Footer</:footer>
    </Card>
    `
});
