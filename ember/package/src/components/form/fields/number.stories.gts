import { hash } from '@ember/helper';

import { Form } from '../form.gts';
import { argTypesWithPlaceholder, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';
import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Form/NumberField',
  component: Form,
  argTypes: argTypesWithPlaceholder
} satisfies Meta;

export const Default: StoryObj<FieldArgs> = {
  render: (args) => <template>
    <Form @data={{hash age=undefined}} @submit={{args.submit}} as |f|>
      <f.Number
        @name="age"
        @label={{args.label}}
        @description={{args.description}}
        @disabled={{args.disabled}}
        placeholder={{args.placeholder}}
        required={{args.required}}
      />
      <f.Submit>Send</f.Submit>
    </Form>
  </template>,
  args: {
    label: 'How old are you?'
  },

  decorators: [(story, { args }) => story(parseArgs(args))]
};

export const Description: StoryObj = {
  render: () => <template>
    <Form @data={{hash age=""}} as |f|>
      <f.Number @name="age" @label="How old are you?" @description="Age in Years" />
    </Form>
  </template>
};

export const Placeholder: StoryObj = {
  render: () => <template>
    <Form @data={{hash age=""}} as |f|>
      <f.Number @name="age" @label="How old are you?" placeholder="Age in Years" />
    </Form>
  </template>
};

export const Disabled: StoryObj = {
  render: () => <template>
    <Form @data={{hash age=""}} as |f|>
      <f.Number @name="age" @label="How old are you?" @disabled={{true}} />
    </Form>
  </template>
};
