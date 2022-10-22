import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components/Cards/Card',
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
    <Card as |c|>
      <c.Header>Card Title</c.Header>
      <c.Content>Sample Card Content</c.Content>
      <c.Footer>Footer</c.Footer>
    </Card>
    `
});
