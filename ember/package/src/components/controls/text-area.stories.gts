import { action } from 'storybook/actions';

import {
  DISABLED_ARG_TYPE,
  parseOptionalBooleanArg,
  PLACEHOLDER_ARG_TYPE,
  SPACING_ARG_TYPE
} from '#storybook';

import { TextArea, type TextAreaSignature } from './text-area.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Controls/TextArea',
  component: TextArea,
  argTypes: {
    ...DISABLED_ARG_TYPE,
    ...PLACEHOLDER_ARG_TYPE,
    ...SPACING_ARG_TYPE,
    value: {
      control: 'text'
    }
  }
} satisfies Meta;

type Args = TextAreaSignature['Args'] & { disabled: boolean | string };

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
