import { action } from 'storybook/actions';

import { DISABLED_ARG_TYPE, parseOptionalBooleanArg } from '#storybook';

import { Radio, type RadioSignature } from './radio.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Controls/Radio',
  component: Radio,
  argTypes: {
    ...DISABLED_ARG_TYPE,
    value: {
      control: 'boolean'
    }
  }
} satisfies Meta;

type Args = RadioSignature['Args'] & { disabled: boolean | string; value: boolean | string };

function parseArgs(args: Args): Args {
  return {
    ...args,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    disabled: parseOptionalBooleanArg(args.disabled),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    value: parseOptionalBooleanArg(args.value)
  };
}

export const Showcase: StoryObj<Args> = {
  args: {
    update: action('update')
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  decorators: [(story, { args }) => story(parseArgs(args))]
};
