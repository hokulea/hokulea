import { action } from 'storybook/actions';

import { parseOptionalBooleanArg } from '../../-private/stories.ts';
import { NumberInput, type NumberInputSignature } from './number-input.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Controls/NumberInput',
  component: NumberInput,
  argTypes: {
    value: {
      name: 'Value',
      control: 'number'
    },
    placeholder: {
      name: 'Placeholder',
      control: 'text'
    },
    disabled: {
      name: 'Disabled',
      control: 'boolean'
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
