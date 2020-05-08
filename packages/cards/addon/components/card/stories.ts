import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components|Cards/Card'
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
    <Card as |c|>
      <c.Header>Card Title</c.Header>
      <c.Content>Sample Card Content</c.Content>
      <c.Footer>Footer</c.Footer>
    </Card>
    `
  };
};
