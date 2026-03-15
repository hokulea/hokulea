import { hbs } from 'ember-cli-htmlbars';

import { getIconSvg } from '../../-private/stories.ts';

export default {
  title: 'Components/Navigation/TabNav',
  component: 'TabNav',
  parameters: {
    options: {
      showPanel: false,
      isToolshown: true
    },
    layout: 'fullscreen'
  },
  controls: { hideNoControlsWarning: true }
};

export const Showcase = {
  render: () => ({
    template: hbs`
      <TabNav as |n|>
        <n.Item @icon={{this.icons.dashboard}}>Dashboard</n.Item>
        <n.Item @icon={{this.icons.user}}>Profile</n.Item>
        <n.Item @icon={{this.icons.settings}}>Settings</n.Item>
      </TabNav>
    `,
    context: {
      icons: {
        dashboard: getIconSvg('chart-line'),
        profile: getIconSvg('user'),
        settings: getIconSvg('gear')
      }
    }
  })
};
