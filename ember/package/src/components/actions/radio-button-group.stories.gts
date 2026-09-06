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

const leftIcon = getIconSvg('text-align-left') as string;
const centerIcon = getIconSvg('text-align-center') as string;
const rightIcon = getIconSvg('text-align-right') as string;
const justifiedIcon = getIconSvg('text-align-justify') as string;

export const Stack: StoryObj = {
  render: (args) => <template>
    <div class="flow">
      <h3>Radio Button Group</h3>
      <RadioButtonGroup @value={{args.value}} @update={{args.update}} as |rg|>
        <rg.Button @value="left">Left</rg.Button>
        <rg.Button @value="center">Center</rg.Button>
        <rg.Button @value="right">Right</rg.Button>
        <rg.Button @value="justified">Justified</rg.Button>
      </RadioButtonGroup>

      <h3>Icon Button Group</h3>
      <RadioButtonGroup @value={{args.value}} @update={{args.update}} as |rg|>
        <rg.IconButton @value="left" @icon={{leftIcon}} @label="Align left" />
        <rg.IconButton @value="center" @icon={{centerIcon}} @label="Align center" />
        <rg.IconButton @value="right" @icon={{rightIcon}} @label="Align right" />
        <rg.IconButton @value="justified" @icon={{justifiedIcon}} @label="Align justified" />
      </RadioButtonGroup>
    </div>
  </template>,
  args: {
    value: 'center',
    update: action('update')
  }
};
