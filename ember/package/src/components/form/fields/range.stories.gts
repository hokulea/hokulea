import { hash } from '@ember/helper';

import { Form } from '../form.gts';
import { RangeField } from './range.gts';
import { baseArgTypes, parseArgs as _parseArgs } from './stories-utils.ts';

import type { RangeInputSignature } from '../../controls/range-input.gts';
import type { FieldArgs } from './stories-utils.ts';
import type { Meta, StoryObj } from 'ember-storybook';
import type { InputType } from 'storybook/internal/types';

const rangeArgTypes: Record<string, InputType> = {
  ...baseArgTypes,
  min: {
    control: 'number'
  },
  max: {
    control: 'number'
  },
  step: {
    control: 'text'
  }
};

type RangeArgs = Pick<RangeInputSignature['Args'], 'min' | 'max' | 'step'>;
type Args = FieldArgs & RangeArgs;

function parseArgs(args: Args): Args {
  return _parseArgs(args) as Args;
}

export default {
  title: 'Form/RangeField',
  component: RangeField,
  argTypes: rangeArgTypes
} satisfies Meta;

export const Default: StoryObj<Args> = {
  render: (args) => <template>
    <Form @data={{hash fruitAmount=undefined}} @submit={{args.submit}} as |f|>
      <f.Range
        @name="fruitAmount"
        @label={{args.label}}
        @description={{args.description}}
        @disabled={{args.disabled}}
        placeholder={{args.placeholder}}
        required={{args.required}}
        min={{args.min}}
        max={{args.max}}
        step={{args.step}}
      />
      <f.Submit>Send</f.Submit>
    </Form>
  </template>,
  args: {
    label: 'How many fruits do you want?'
  },

  decorators: [(story, { args }) => story(parseArgs(args))]
};

export const Description: StoryObj = {
  render: () => <template>
    <Form @data={{hash fruitAmount=undefined}} as |f|>
      <f.Range
        @name="fruitAmount"
        @label="How many fruits do you want?"
        @description="You have chosen a fruit before, don't you?"
      />
    </Form>
  </template>
};

export const Placeholder: StoryObj = {
  render: () => <template>
    <Form @data={{hash fruitAmount=undefined}} as |f|>
      <f.Range
        @name="fruitAmount"
        @label="How many fruits do you want?"
        placeholder="You have chosen a fruit before, don't you?"
      />
    </Form>
  </template>
};

export const Disabled: StoryObj = {
  render: () => <template>
    <Form @data={{hash fruitAmount=undefined}} as |f|>
      <f.Range @name="fruitAmount" @label="How many fruits do you want?" @disabled={{true}} />
    </Form>
  </template>
};
