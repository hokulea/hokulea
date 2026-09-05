import { Link } from './link.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Navigation/Link',
  component: Link
} satisfies Meta;

export const Showcase: StoryObj = {
  render: () => <template>
    <Link @href="http://gos.si">gos.si</Link>
  </template>
};
