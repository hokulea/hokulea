import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Controls/Select',
  component: 'Select',
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
    disabled: parseOptionalBooleanArg(args.disabled)
  };
}

export const Showcase = {
  render: (args) => ({
    template: hbs`
      <Select @update={{this.update}} @disabled={{this.disabled}} as |l|>
        {{#each (array 'Apple' 'Banana' 'Pineapple') as |i|}}
          <l.Option @value={{i}}>{{i}}</l.Option>
        {{/each}}
      </Select>
    `,
    context: {
      ...parseArgs(args),
      update: action('update')
    }
  }),
  argTypes: {
    // value: {
    //   name: 'Value',
    //   control: 'text'
    // },
    disabled: {
      name: 'Disabled',
      control: 'boolean'
    }
  }
};
