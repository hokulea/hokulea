import { parseOptionalBooleanArg } from '../../-private/stories.ts';
import { popover } from '../../helpers/popover.ts';
import { Button } from '../actions/button.gts';
import { Menu, type MenuSignature } from './menu.gts';

import type { Meta, StoryObj } from 'ember-storybook';

type Args = MenuSignature['Args'] & { disabled: boolean | string };

function parseArgs(args: Args): Args {
  return {
    ...args,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    disabled: parseOptionalBooleanArg(args.disabled)
  };
}

export default {
  title: 'Controls/Menu',
  component: Menu,
  argTypes: {
    disabled: {
      name: 'Disabled',
      control: 'boolean'
    }
  },
  // @ts-expect-error huh, what's this?
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  decorators: [(story, { args }) => story(parseArgs(args))]
} satisfies Meta;

export const M: StoryObj<Args> = {
  name: 'Menu',
  render: (args: Args) => <template>
    <Menu @disabled={{args.disabled}} as |m|>
      <m.Item>Rename Symbol</m.Item>
      <m.Item>Format Document</m.Item>
      <m.Item>Refactor...</m.Item>
      <m.Item>Source Action...</m.Item>
      <hr />
      <m.Item>
        <:label>Share</:label>
        <:menu as |s|>
          <s.Item>
            <:label>Code</:label>
            <:menu as |c|>
              <c.Item>Copy Github Permalink</c.Item>
              <c.Item>Copy Github Head Link</c.Item>
            </:menu>
          </s.Item>
          <s.Item>
            <:label>Social</:label>
            <:menu as |c|>
              <c.Item>Twitter</c.Item>
              <c.Item>Mastodon</c.Item>
              <c.Item>Bsky</c.Item>
            </:menu>
          </s.Item>
        </:menu>
      </m.Item>
      <hr />
      <m.Item>Cut</m.Item>
      <m.Item>Copy</m.Item>
      <m.Item>Paste</m.Item>
    </Menu>
  </template>
};

export const ButtonMenu: StoryObj<Args> = {
  render: (args: Args) => <template>
    {{#let (popover position="bottom span-right") as |p|}}
      <Button {{p.trigger}}>Open Menu</Button>
      <Menu @disabled={{args.disabled}} {{p.target}} as |m|>
        <m.Item>Rename Symbol</m.Item>
        <m.Item>Format Document</m.Item>
        <m.Item>Refactor...</m.Item>
        <m.Item>Source Action...</m.Item>
        <hr />
        <m.Item>
          <:label>Share</:label>
          <:menu as |s|>
            <s.Item>
              <:label>Code</:label>
              <:menu as |c|>
                <c.Item>Copy Github Permalink</c.Item>
                <c.Item>Copy Github Head Link</c.Item>
              </:menu>
            </s.Item>
            <s.Item>
              <:label>Social</:label>
              <:menu as |c|>
                <c.Item>Twitter</c.Item>
                <c.Item>Mastodon</c.Item>
                <c.Item>Bsky</c.Item>
              </:menu>
            </s.Item>
          </:menu>
        </m.Item>
        <hr />
        <m.Item>Cut</m.Item>
        <m.Item>Copy</m.Item>
        <m.Item>Paste</m.Item>
      </Menu>
    {{/let}}
  </template>
};
