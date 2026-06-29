import { hbs } from 'ember-cli-htmlbars';

import { action } from 'storybook/actions';

import { getIconSvg, parseOptionalBooleanArg } from '../../-private/stories.ts';

export default {
  title: 'Components/Actions/RadioButtonGroup',
  component: 'radio-button-group',
  parameters: {
    options: {
      showPanel: true,
      showToolbar: true
    }
  }
};

type Args = {
  value: string;
  disabled: boolean | string;
};

function parseArgs(args: Args) {
  return {
    ...args,
    disabled: parseOptionalBooleanArg(args.disabled)
  };
}

export const Showcase = {
  render: (args: Args) => ({
    template: hbs`
      <RadioButtonGroup @value={{this.value}} @update={{this.update}} as |rg|>
        <rg.Button @value="left">Left</rg.Button>
        <rg.Button @value="center">Center</rg.Button>
        <rg.Button @value="right">Right</rg.Button>
        <rg.Button @value="justify">Justify</rg.Button>
      </RadioButtonGroup>
    `,
    context: {
      ...parseArgs(args),
      update: action('update')
    }
  }),
  argTypes: {
    value: {
      name: 'Value',
      options: ['left', 'center', 'right', 'justify'],
      control: 'radio'
    }
  },
  args: {
    value: 'left'
  }
};

export const Stack = {
  render: () => ({
    template: hbs`
      {{!-- template-lint-disable no-inline-styles --}}
      <div style="display: flex; width: 50%; flex-direction: column; gap: var(--spacing-container-gap-block-1); margin: auto;">
        <h3>Radio Button Group</h3>
        <RadioButtonGroup @value="center" @update={{this.update}} as |rg|>
          <rg.Button @value="left">Left</rg.Button>
          <rg.Button @value="center">Center</rg.Button>
          <rg.Button @value="right">Right</rg.Button>
          <rg.Button @value="justified">Justified</rg.Button>
        </RadioButtonGroup>

        <h3>Icon Button Group</h3>
        <RadioButtonGroup @value="center" @update={{this.update}} as |rg|>
          <rg.IconButton @value="left" @icon={{this.leftIcon}} @label="Align left" />
          <rg.IconButton @value="center" @icon={{this.centerIcon}} @label="Align center" />
          <rg.IconButton @value="right" @icon={{this.rightIcon}} @label="Align right" />
          <rg.IconButton @value="justified" @icon={{this.justifiedIcon}} @label="Align justified" />
        </RadioButtonGroup>
      </div>
    `,
    context: {
      update: action('update'),
      leftIcon: getIconSvg('text-align-left'),
      centerIcon: getIconSvg('text-align-center'),
      rightIcon: getIconSvg('text-align-right'),
      justifiedIcon: getIconSvg('text-align-justify')
    }
  }),
  parameters: {
    options: {
      showPanel: false
    }
  }
};
