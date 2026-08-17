import { action } from 'storybook/actions';

import { parseOptionalBooleanArg } from '../../-private/stories.ts';
import { PhoneInput, type PhoneInputSignature } from './phone-input.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Controls/PhoneInput',
  component: PhoneInput,
  argTypes: {
    value: {
      name: 'Value',
      control: 'text'
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

type Args = PhoneInputSignature['Args'] & { disabled: boolean | string };

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
