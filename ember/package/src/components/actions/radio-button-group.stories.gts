import { action } from 'storybook/actions';

import { getIconSvg } from '../../-private/stories.ts';
import { RadioButtonGroup } from './radio-button-group.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Actions/RadioButtonGroup',
  component: RadioButtonGroup,
  argTypes: {
    value: {
      options: ['left', 'center', 'right', 'justify'],
      control: 'radio'
    }
  }
} satisfies Meta;

export const Showcase: StoryObj = {
  render: (args) => <template>
    <RadioButtonGroup @value={{args.value}} @update={{args.update}} as |rg|>
      <rg.Button @value="left">Left</rg.Button>
      <rg.Button @value="center">Center</rg.Button>
      <rg.Button @value="right">Right</rg.Button>
      <rg.Button @value="justify">Justify</rg.Button>
    </RadioButtonGroup>
  </template>,
  args: {
    value: 'left',
    update: action('update')
  }
};

export const Stack: StoryObj = {
  render: (args) => <template>
    <div
      style="display: flex; width: 50%; flex-direction: column; gap: var(--spacing-container-gap-block-1); margin: auto;"
    >
      <h3>Radio Button Group</h3>
      <RadioButtonGroup @value="center" @update={{args.update}} as |rg|>
        <rg.Button @value="left">Left</rg.Button>
        <rg.Button @value="center">Center</rg.Button>
        <rg.Button @value="right">Right</rg.Button>
        <rg.Button @value="justified">Justified</rg.Button>
      </RadioButtonGroup>

      <h3>Icon Button Group</h3>
      <RadioButtonGroup @value="center" @update={{args.update}} as |rg|>
        <rg.IconButton @value="left" @icon={{args.leftIcon}} @label="Align left" />
        <rg.IconButton @value="center" @icon={{args.centerIcon}} @label="Align center" />
        <rg.IconButton @value="right" @icon={{args.rightIcon}} @label="Align right" />
        <rg.IconButton @value="justified" @icon={{args.justifiedIcon}} @label="Align justified" />
      </RadioButtonGroup>
    </div>
  </template>,
  args: {
    update: action('update'),
    leftIcon: getIconSvg('text-align-left'),
    centerIcon: getIconSvg('text-align-center'),
    rightIcon: getIconSvg('text-align-right'),
    justifiedIcon: getIconSvg('text-align-justify')
  }
};
