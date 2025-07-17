import { hbs } from 'ember-cli-htmlbars';

import { action } from 'storybook/actions';

import { parseOptionalBooleanArg } from '../-private/stories.ts';

import type { InputArgs } from './-input.ts';

export default {
  title: 'Components/Controls/Radio',
  component: 'Card',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  },
  controls: { hideNoControlsWarning: true }
};

type Args = InputArgs<boolean> & { disabled: boolean | string; checked: boolean | string };

function parseArgs(args: Args) {
  return {
    ...args,
    disabled: parseOptionalBooleanArg(args.disabled),
    checked: parseOptionalBooleanArg(args.checked)
  };
}

export const Showcase = {
  render: (args: Args) => ({
    template: hbs`<Radio @value={{this.checked}} @update={{this.update}} @disabled={{this.disabled}}/>`,
    context: {
      ...parseArgs(args),
      update: action('update')
    }
  }),
  argTypes: {
    checked: {
      name: 'Checked',
      control: 'boolean'
    },
    disabled: {
      name: 'Disabled',
      control: 'boolean'
    }
  }
};
