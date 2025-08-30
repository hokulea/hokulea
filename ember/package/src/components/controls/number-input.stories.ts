import { hbs } from 'ember-cli-htmlbars';

import { action } from 'storybook/actions';

import { parseOptionalBooleanArg } from '../../-private/stories.ts';

import type { InputArgs } from './-input.ts';

export default {
  title: 'Components/Controls/NumberInput',
  component: 'Card',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  },
  controls: { hideNoControlsWarning: true }
};

type Args = InputArgs<boolean> & { disabled: boolean | string };

function parseArgs(args: Args) {
  return {
    ...args,
    disabled: parseOptionalBooleanArg(args.disabled)
  };
}

export const Showcase = {
  render: (args: Args) => ({
    template: hbs`<NumberInput @value={{this.value}} @update={{this.update}} @disabled={{this.disabled}} placeholder={{this.placeholder}}/>`,
    context: {
      ...parseArgs(args),
      update: action('update')
    }
  }),
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
};
