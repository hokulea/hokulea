import { getIconSvg } from '../../-private/stories.ts';
import { TabNav } from './tab-nav.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Navigation/TabNav',
  component: TabNav,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta;

const dashboard = getIconSvg('chart-line') as string;
const profile = getIconSvg('user') as string;
const settings = getIconSvg('gear') as string;

export const Showcase: StoryObj = {
  render: () => <template>
    <TabNav as |n|>
      <n.Item @icon={{dashboard}}>Dashboard</n.Item>
      <n.Item @icon={{profile}}>Profile</n.Item>
      <n.Item @icon={{settings}}>Settings</n.Item>
    </TabNav>
  </template>
};
