import { action } from 'storybook/actions';

import { DISABLED_ARG_TYPE, ORIENTATION_ARG_TYPE, parseOptionalBooleanArg } from '#storybook';

import { RangeInput, type RangeInputSignature } from './range-input.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Controls/RangeInput',
  component: RangeInput,
  argTypes: {
    ...DISABLED_ARG_TYPE,
    ...ORIENTATION_ARG_TYPE,
    value: {
      control: 'number'
    },
    min: {
      name: 'min',
      control: 'number'
    },
    max: {
      name: 'max',
      control: 'number'
    },
    step: {
      name: 'step',
      control: 'text'
    }
  }
} satisfies Meta;

type Args = RangeInputSignature['Args'] & { disabled: boolean | string };

function parseArgs(args: Args): Args {
  return {
    ...args,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    disabled: parseOptionalBooleanArg(args.disabled)
  };
}

export const Showcase: StoryObj<Args> = {
  render: (args) => <template>
    <RangeInput
      @value={{args.value}}
      @update={{args.update}}
      @disabled={{args.disabled}}
      @orientation={{args.orientation}}
      min={{args.min}}
      max={{args.max}}
      step={{args.step}}
    />
  </template>,
  args: {
    update: action('update')
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  decorators: [(story, { args }) => story(parseArgs(args))]
};
