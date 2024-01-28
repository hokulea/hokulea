import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components/Cards/Card',
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
      <:main>Sample Card Content</:main>
      <:footer>Footer</:footer>
    </Card>
    `
});
