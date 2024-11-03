import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';

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

function parseOptionalBooleanArg(arg) {
  return typeof arg === 'boolean' ? arg : typeof arg === 'string' ? JSON.parse(arg) : undefined;
}

function parseArgs(args) {
  return {
    ...args,
    disabled: parseOptionalBooleanArg(args.disabled),
    checked: parseOptionalBooleanArg(args.checked)
  };
}

export const Showcase = {
  render: (args) => ({
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
