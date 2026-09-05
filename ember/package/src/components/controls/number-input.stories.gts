import { action } from 'storybook/actions';

import {
  DISABLED_ARG_TYPE,
  parseOptionalBooleanArg,
  PLACEHOLDER_ARG_TYPE,
  SPACING_ARG_TYPE
} from '#storybook';

import { NumberInput, type NumberInputSignature } from './number-input.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Controls/NumberInput',
  component: NumberInput,
  argTypes: {
    ...DISABLED_ARG_TYPE,
    ...PLACEHOLDER_ARG_TYPE,
    ...SPACING_ARG_TYPE,
    value: {
      control: 'number'
    }
  }
} satisfies Meta;

type Args = NumberInputSignature['Args'] & { disabled: boolean | string };

function parseArgs(args: Args): Args {
  return {
    ...args,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    disabled: parseOptionalBooleanArg(args.disabled)
  };
}

export const Showcase: StoryObj<Args> = {
  args: {
    update: action('update')
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  decorators: [(story, { args }) => story(parseArgs(args))]
};
