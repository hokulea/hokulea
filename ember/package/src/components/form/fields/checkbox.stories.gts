import { hash } from '@ember/helper';

import { Form } from '../form.gts';
import { CheckboxField } from './checkbox.gts';
import { baseArgTypes, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';
import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Form/CheckboxField',
  component: CheckboxField,
  argTypes: baseArgTypes
} satisfies Meta;

export const Showcase: StoryObj<FieldArgs> = {
  render: (args) => <template>
    <Form @data={{hash terms=undefined}} @submit={{args.submit}} as |f|>
      <f.Checkbox
        @name="terms"
        @label={{args.label}}
        @description={{args.description}}
        @disabled={{args.disabled}}
        required={{args.required}}
      />
      <f.Submit>Send</f.Submit>
    </Form>
  </template>,
  args: {
    label: 'I agree to Terms and Conditions'
  },

  decorators: [(story, { args }) => story(parseArgs(args))]
};

export const Description: StoryObj = {
  render: () => <template>
    <Form @data={{hash terms=""}} as |f|>
      <f.Checkbox
        @name="terms"
        @label="I agree to Terms and Conditions"
        @description="I really do!"
      />
    </Form>
  </template>
};

export const Disabled: StoryObj = {
  render: () => <template>
    <Form @data={{hash terms=""}} as |f|>
      <f.Checkbox @name="terms" @label="I agree to Terms and Conditions" @disabled={{true}} />
    </Form>
  </template>
};
