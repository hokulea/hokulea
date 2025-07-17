import { hbs } from 'ember-cli-htmlbars';

import { action } from 'storybook/actions';

import { parseOptionalBooleanArg } from '../-private/stories.ts';

import type { InputArgs } from './-input.ts';

export default {
  title: 'Components/Controls/List',
  component: 'List',
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
    template: hbs`
      <List @update={{this.update}} @disabled={{this.disabled}} as |l|>
        {{#each (array 'Apple' 'Banana' 'Pineapple') as |i|}}
          <l.Option @value={{i}}>{{i}}</l.Option>
        {{/each}}
      </List>
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
