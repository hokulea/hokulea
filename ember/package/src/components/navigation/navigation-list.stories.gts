import { getIconSvg } from '../../-private/stories.ts';
import { NavigationList } from './navigation-list.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Navigation/NavigationList',
  component: NavigationList
} satisfies Meta;

export const Showcase: StoryObj = {
  render: (args) => <template>
    <NavigationList as |n|>
      <n.Item @icon={{args.icons.dashboard}}>Dashboard</n.Item>
      <n.Title>User</n.Title>
      <n.Item @icon={{args.icons.profile}}>Profile</n.Item>
      <n.Item @icon={{args.icons.settings}}>Settings</n.Item>
    </NavigationList>
  </template>,
  args: {
    icons: {
      dashboard: getIconSvg('chart-line'),
      profile: getIconSvg('user'),
      settings: getIconSvg('gear')
    }
  }
};
