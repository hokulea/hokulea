import { array } from '@ember/helper';

import { action } from 'storybook/actions';

import { parseOptionalBooleanArg } from '../../-private/stories.ts';
import { Select, type SelectSignature } from './select.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Controls/Select',
  component: Select,
  argTypes: {
    value: {
      name: 'Value',
      control: 'text'
    },
    disabled: {
      name: 'Disabled',
      control: 'boolean'
    }
  }
} satisfies Meta;

type Args = SelectSignature['Args'] & { disabled: boolean | string };

function parseArgs(args: Args): Args {
  return {
    ...args,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    disabled: parseOptionalBooleanArg(args.disabled)
  };
}

export const Showcase: StoryObj<Args> = {
  render: (args) => <template>
    <Select @update={{args.update}} @disabled={{args.disabled}} as |l|>
      {{#each (array "Apple" "Banana" "Pineapple") as |i|}}
        <l.Option @value={{i}}>{{i}}</l.Option>
      {{/each}}
    </Select>
  </template>,
  args: {
    update: action('update')
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  decorators: [(story, { args }) => story(parseArgs(args))]
};
