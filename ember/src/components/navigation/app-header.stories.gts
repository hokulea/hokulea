import { fn } from '@ember/helper';

import { action } from 'storybook/actions';

import { AppHeader, type AppHeaderSignature } from './app-header.gts';

import type { Meta, StoryObj } from 'ember-storybook';

type Args = AppHeaderSignature['Args'];

export default {
  title: 'Navigation/AppHeader',
  component: AppHeader,
  argTypes: {
    position: {
      options: ['start', 'center', 'end'],
      control: {
        type: 'radio'
      }
    }
  },
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta;

function push(item: string) {
  action('menu item pushed')(item);
}

export const Showcase: StoryObj<Args> = {
  render: (args) => <template>
    <AppHeader @position={{args.position}}>
      <:brand>Hokulea</:brand>
      <:nav as |n|>
        <n.Item @push={{fn push "actions"}}>Actions</n.Item>
        <n.Item @push={{fn push "content"}}>Content</n.Item>
        <n.Item @push={{fn push "controls"}}>Controls</n.Item>
        <n.Item @push={{fn push "forms"}}>Forms</n.Item>
        <n.Item @push={{fn push "icons"}}>Icons</n.Item>
        <n.Item @push={{fn push "navigation"}}>Navigation</n.Item>
        <n.Item>
          <:label>Let's go down</:label>
          <:menu as |m|>
            <m.Item @push={{fn push "one"}}>One</m.Item>
            <m.Item @push={{fn push "two"}}>Two</m.Item>
            <m.Item @push={{fn push "three"}}>Three</m.Item>
            <m.Item>
              <:label>Down down</:label>
              <:menu as |mm|>
                <mm.Item @push={{fn push "2. one larger text"}}>2. One Larger text</mm.Item>
                <mm.Item @push={{fn push "2. Two"}}>2. Two</mm.Item>
              </:menu>
            </m.Item>
          </:menu>
        </n.Item>
      </:nav>
      <:aux>
        at the end
      </:aux>
    </AppHeader>
  </template>,
  args: {
    position: 'start'
  }
};
