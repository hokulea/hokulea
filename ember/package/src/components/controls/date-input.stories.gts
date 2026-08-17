import { action } from 'storybook/actions';

import { parseOptionalBooleanArg } from '../../-private/stories.ts';
import { DateInput, type DateInputSignature } from './date-input.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Controls/DateInput',
  component: DateInput,
  argTypes: {
    value: {
      name: 'Value',
      control: 'date'
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

type Args = DateInputSignature['Args'] & { disabled: boolean | string; value: string | Date };

function parseArgs(args: Args): Args {
  let value: string;

  if (args.value) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const isoString = new Date(args.value).toISOString();

    value = isoString.slice(0, Math.max(0, isoString.indexOf('T')));
  }

  return {
    ...args,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    disabled: parseOptionalBooleanArg(args.disabled),
    // @ts-expect-error something huh?
    value
  };
}

export const Showcase: StoryObj<Args> = {
  args: {
    update: action('update')
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  decorators: [(story, { args }) => story(parseArgs(args))]
};
