import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Controls/EmailInput',
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
    template: hbs`<EmailInput @value={{this.value}} @update={{this.update}} @disabled={{this.disabled}} placeholder={{this.placeholder}}/>`,
    context: {
      ...parseArgs(args),
      update: action('update')
    }
  }),
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
  },
  args: {
    value: '',
    placeholder: ''
  }
};
