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

export const Showcase: StoryObj = {
  render: (args) => <template>
    <TabNav as |n|>
      <n.Item @icon={{args.icons.dashboard}}>Dashboard</n.Item>
      <n.Item @icon={{args.icons.profile}}>Profile</n.Item>
      <n.Item @icon={{args.icons.settings}}>Settings</n.Item>
    </TabNav>
  </template>,
  args: {
    icons: {
      dashboard: getIconSvg('chart-line'),
      profile: getIconSvg('user'),
      settings: getIconSvg('gear')
    }
  }
};
