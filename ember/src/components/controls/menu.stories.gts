import { action } from 'storybook/actions';

import { DISABLED_ARG_TYPE, parseOptionalBooleanArg } from '#storybook';

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
    ...DISABLED_ARG_TYPE
  },
  // @ts-expect-error huh, what's this?
  decorators: [(story, { args }) => story({ args: parseArgs(args) })]
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

const logPush = action('push');
const logUpdate = action('update');

// Storybook does not type `updateArgs` on the story context (it leaks through
// an index signature as `any`), so narrow it here for the stateful stories
type UpdateArgs<TArgs> = (updatedArgs: Partial<TArgs>) => void;

type ToggleKey = 'wordWrap' | 'minimap' | 'autoSave';
type CheckboxArgs = Args & Record<ToggleKey, boolean>;

export const Checkboxes: StoryObj<CheckboxArgs> = {
  name: 'Checkbox items',
  args: {
    wordWrap: true,
    minimap: false,
    autoSave: true
  },
  argTypes: {
    wordWrap: { control: 'boolean' },
    minimap: { control: 'boolean' },
    autoSave: { control: 'boolean' }
  },
  render: (args, context) => {
    const updateArgs = context.updateArgs as UpdateArgs<CheckboxArgs>;

    const toggle = (key: ToggleKey) => (checked: boolean) => {
      logPush(key, checked);
      updateArgs({ [key]: checked });
    };

    return <template>
      <Menu @disabled={{args.disabled}} as |m|>
        <m.Checkbox @checked={{args.wordWrap}} @push={{toggle "wordWrap"}}>Word Wrap</m.Checkbox>
        <m.Checkbox @checked={{args.minimap}} @push={{toggle "minimap"}}>Minimap</m.Checkbox>
        <m.Checkbox @checked={{args.autoSave}} @push={{toggle "autoSave"}}>Auto Save</m.Checkbox>
        <m.Checkbox @disabled={{true}}>Vim Mode</m.Checkbox>
      </Menu>
    </template>;
  }
};

type RadioArgs = Args & { theme: string };

export const Radios: StoryObj<RadioArgs> = {
  name: 'Radio items',
  args: {
    theme: 'light'
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark', 'system'] }
  },
  render: (args, context) => {
    const updateArgs = context.updateArgs as UpdateArgs<RadioArgs>;

    const select = (theme: string | string[]) => {
      if (Array.isArray(theme)) {
        return;
      }

      logUpdate(theme);
      updateArgs({ theme });
    };

    return <template>
      <Menu @disabled={{args.disabled}} @value={{args.theme}} @update={{select}} as |m|>
        <m.Radio @value="light">Light</m.Radio>
        <m.Radio @value="dark">Dark</m.Radio>
        <m.Radio @value="system">System</m.Radio>
      </Menu>
    </template>;
  }
};

type GroupKey = 'size' | 'lang';
type GroupArgs = Args & Record<GroupKey, string>;

export const Groups: StoryObj<GroupArgs> = {
  name: 'Radio groups',
  args: {
    size: 'medium',
    lang: 'en'
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    lang: { control: 'select', options: ['en', 'de', 'ja'] }
  },
  render: (args, context) => {
    const updateArgs = context.updateArgs as UpdateArgs<GroupArgs>;

    // `m.Group`'s args are typed against the menu's value type, which stays
    // `unknown` as no menu-level radio items narrow it
    const select = (key: GroupKey) => (value: unknown) => {
      if (typeof value !== 'string') {
        return;
      }

      logUpdate(key, value);
      updateArgs({ [key]: value });
    };

    return <template>
      <Menu @disabled={{args.disabled}} as |m|>
        <m.Group @value={{args.size}} @update={{select "size"}} as |g|>
          <g.Radio @value="small">Small</g.Radio>
          <g.Radio @value="medium">Medium</g.Radio>
          <g.Radio @value="large">Large</g.Radio>
        </m.Group>
        <hr />
        <m.Group @value={{args.lang}} @update={{select "lang"}} as |g|>
          <g.Radio @value="en">English</g.Radio>
          <g.Radio @value="de">Deutsch</g.Radio>
          <g.Radio @value="ja">日本語</g.Radio>
        </m.Group>
      </Menu>
    </template>;
  }
};

type MixedKey = 'statusBar' | 'minimap';
type MixedArgs = Args & { lang: string } & Record<MixedKey, boolean>;

export const Mixed: StoryObj<MixedArgs> = {
  name: 'Mixed menu',
  args: {
    lang: 'en',
    statusBar: true,
    minimap: false
  },
  argTypes: {
    lang: { control: 'select', options: ['en', 'de', 'ja'] },
    statusBar: { control: 'boolean' },
    minimap: { control: 'boolean' }
  },
  render: (args, context) => {
    const updateArgs = context.updateArgs as UpdateArgs<MixedArgs>;

    const toggle = (key: MixedKey) => (checked: boolean) => {
      logPush(key, checked);
      updateArgs({ [key]: checked });
    };

    const selectLang = (lang: string | string[]) => {
      if (Array.isArray(lang)) {
        return;
      }

      logUpdate(lang);
      updateArgs({ lang });
    };

    return <template>
      <Menu @disabled={{args.disabled}} @value={{args.lang}} @update={{selectLang}} as |m|>
        <m.Item>New File</m.Item>
        <m.Item>Open File…</m.Item>
        <hr />
        <m.Item>
          <:label>View</:label>
          <:menu as |n|>
            <n.Checkbox @checked={{args.statusBar}} @push={{toggle "statusBar"}}>
              Status Bar
            </n.Checkbox>
            <n.Checkbox @checked={{args.minimap}} @push={{toggle "minimap"}}>Minimap</n.Checkbox>
          </:menu>
        </m.Item>
        <hr />
        <m.Radio @value="en">English</m.Radio>
        <m.Radio @value="de">Deutsch</m.Radio>
        <m.Radio @value="ja">日本語</m.Radio>
      </Menu>
    </template>;
  }
};
