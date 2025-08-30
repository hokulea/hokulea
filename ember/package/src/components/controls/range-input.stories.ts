import { hbs } from 'ember-cli-htmlbars';

import { action } from 'storybook/actions';

import { parseOptionalBooleanArg } from '../../-private/stories.ts';

import type { InputArgs } from './-input.ts';

export default {
  title: 'Components/Controls/RangeInput',
  component: 'Card',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  },
  controls: { hideNoControlsWarning: true }
};

type Args = InputArgs<boolean> & {
  disabled: boolean | string;
  min?: number;
  max?: number;
  step?: number | 'any';
  orientation?: 'horizontal' | 'vertical';
};

function parseArgs(args: Args) {
  return {
    ...args,
    disabled: parseOptionalBooleanArg(args.disabled)
  };
}

export const Showcase = {
  render: (args: Args) => ({
    template: hbs`<RangeInput
      @value={{this.value}}
      @update={{this.update}}
      @disabled={{this.disabled}}
      @orientation={{this.orientation}}
      min={{this.min}}
      max={{this.max}}
      step={{this.step}}
    />`,
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
    disabled: {
      name: 'Disabled',
      control: 'boolean'
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
};
