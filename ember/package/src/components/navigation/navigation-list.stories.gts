import { getIconSvg } from '../../-private/stories.ts';
import { NavigationList } from './navigation-list.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Navigation/NavigationList',
  component: NavigationList
} satisfies Meta;

const dashboard = getIconSvg('chart-line') as string;
const profile = getIconSvg('user') as string;
const settings = getIconSvg('gear') as string;

export const Showcase: StoryObj = {
  render: () => <template>
    <NavigationList as |n|>
      <n.Item @icon={{dashboard}}>Dashboard</n.Item>
      <n.Title>User</n.Title>
      <n.Item @icon={{profile}}>Profile</n.Item>
      <n.Item @icon={{settings}}>Settings</n.Item>
    </NavigationList>
  </template>
};
