import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';

import { parseOptionalBooleanArg } from '../-private/stories.ts';

import type { InputArgs } from './-input.ts';

export default {
  title: 'Components/Controls/DateInput',
  component: 'Card',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  },
  controls: { hideNoControlsWarning: true }
};

type Args = InputArgs<boolean> & { disabled: boolean | string; value: string | Date };

function parseArgs(args: Args) {
  let value: string | undefined;

  if (args.value) {
    const isoString = new Date(args.value).toISOString();

    value = isoString.slice(0, Math.max(0, isoString.indexOf('T')));
  }

  return {
    ...args,
    disabled: parseOptionalBooleanArg(args.disabled),
    value
  };
}

export const Showcase = {
  render: (args: Args) => ({
    template: hbs`<DateInput @value={{this.value}} @update={{this.update}} @disabled={{this.disabled}} placeholder={{this.placeholder}}/>`,
    context: {
      ...parseArgs(args),
      update: action('update')
    }
  }),
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
};
