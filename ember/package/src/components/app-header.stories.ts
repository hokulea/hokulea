import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Navigation/AppHeader',
  component: 'AppHeader',
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
  render: (args: { position: 'start' | 'center' | 'end' }) => ({
    template: hbs`
      <AppHeader @position={{this.position}}>
        <:brand>Hokulea</:brand>
        <:nav as |n|>
          <n.Item @push={{fn this.log 'actions'}}>Actions</n.Item>
          <n.Item @push={{fn this.log 'content'}}>Content</n.Item>
          <n.Item @push={{fn this.log 'controls'}}>Controls</n.Item>
          <n.Item @push={{fn this.log 'forms'}}>Forms</n.Item>
          <n.Item @push={{fn this.log 'icons'}}>Icons</n.Item>
          <n.Item @push={{fn this.log 'navigation'}}>Navigation</n.Item>
          <n.Item>
            <:label>Let's go down</:label>
            <:menu as |m|>
              <m.Item @push={{fn this.log 'one'}}>One</m.Item>
              <m.Item @push={{fn this.log 'two'}}>Two</m.Item>
              <m.Item @push={{fn this.log 'three'}}>Three</m.Item>
              <m.Item>
                <:label>Down down</:label>
                <:menu as |mm|>
                  <mm.Item @push={{fn this.log '2. one larger text'}}>2. One Larger text</mm.Item>
                  <mm.Item @push={{fn this.log '2. Two'}}>2. Two</mm.Item>
                </:menu>
              </m.Item>
            </:menu>
          </n.Item>
        </:nav>
        <:aux>
          at the end
        </:aux>
      </AppHeader>
    `,
    context: {
      ...args,
      log(item: string) {
        action('menu item pushed')(item);
      }
    }
  }),
  argTypes: {
    position: {
      name: 'Position',
      options: ['start', 'center', 'end'],
      control: {
        type: 'radio'
      }
    }
  },
  args: {
    position: 'start'
  }
};
