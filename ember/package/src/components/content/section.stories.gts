import { Card } from './card.gts';
import { Section } from './section.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Content/Section',
  component: Section
} satisfies Meta;

export const Default: StoryObj = {
  render: () => <template>
    <Section @title="Training">
      Planning, Diagnostics, Control, Documentation
    </Section>
  </template>
};

export const WithCard: StoryObj = {
  render: () => <template>
    <Section @title="Training">
      <Card>
        <:header>Planning</:header>
        <:body>Makro, Meso, Micro - but also contents</:body>
      </Card>

      <Card>
        <:header>Controlling</:header>
        <:body>Parameters to control the practice</:body>
      </Card>
    </Section>
  </template>
};
