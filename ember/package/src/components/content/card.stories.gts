import { Card } from './card.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Content/Card',
  component: Card
} satisfies Meta;

export const Default: StoryObj = {
  render: () => <template>
    <Card>
      Sample Card Content
    </Card>
  </template>
};

export const Builder: StoryObj = {
  render: () => <template>
    <Card>
      <:header>Card Title</:header>
      <:body>Sample Card Content</:body>
      <:footer>Footer</:footer>
    </Card>
  </template>
};
