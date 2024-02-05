import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Controls/Checkbox',
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
    template: hbs`<Checkbox @value={{this.checked}} @update={{this.update}} @disabled={{this.disabled}}/>`,
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
