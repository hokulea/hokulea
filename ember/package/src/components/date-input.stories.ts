import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';

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

function parseOptionalBooleanArg(arg) {
  return typeof arg === 'boolean' ? arg : typeof arg === 'string' ? JSON.parse(arg) : undefined;
}

function parseArgs(args) {
  let value: string | undefined = undefined;

  if (args.value) {
    const isoString = new Date(args.value).toISOString();

    value = isoString.substring(0, isoString.indexOf('T'));
  }

  return {
    ...args,
    disabled: parseOptionalBooleanArg(args.disabled),
    value
  };
}

export const Showcase = {
  render: (args) => ({
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
