import { array } from '@ember/helper';

import { action } from 'storybook/actions';

import { DISABLED_ARG_TYPE, parseOptionalBooleanArg } from '#storybook';

import { List, type ListSignature } from './list.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Controls/List',
  component: List,
  argTypes: {
    ...DISABLED_ARG_TYPE,
    value: {
      control: 'text'
    }
  }
} satisfies Meta;

type Args = ListSignature<string>['Args'] & { disabled: boolean | string };

function parseArgs(args: Args): Args {
  return {
    ...args,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    disabled: parseOptionalBooleanArg(args.disabled)
  };
}

export const Showcase: StoryObj<Args> = {
  render: (args: Args) => <template>
    <List @update={{args.update}} @disabled={{args.disabled}} as |l|>
      {{#each (array "Apple" "Banana" "Pineapple") as |i|}}
        <l.Option @value={{i}}>{{i}}</l.Option>
      {{/each}}
    </List>
  </template>,
  args: {
    update: action('update')
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  decorators: [(story, { args }) => story(parseArgs(args))]
};
