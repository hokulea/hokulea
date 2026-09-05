import { hash } from '@ember/helper';

import { type FieldArgs, fieldArgTypesWithPlaceholder, parseFieldArgs } from '#storybook';

import { Form } from '../form.gts';
import { DateField } from './date.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Form/DateField',
  component: DateField,
  argTypes: fieldArgTypesWithPlaceholder
} satisfies Meta;

export const Default: StoryObj<FieldArgs> = {
  render: (args) => <template>
    <Form @data={{hash birthday=undefined}} @submit={{args.submit}} as |f|>
      <f.Date
        @name="birthday"
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
    label: 'Birthday'
  },

  decorators: [(story, { args }) => story(parseFieldArgs(args))]
};

export const Description: StoryObj = {
  render: () => <template>
    <Form @data={{hash birthday=""}} as |f|>
      <f.Date @name="birthday" @label="Birthday" @description="When are you born?" />
    </Form>
  </template>
};

export const Placeholder: StoryObj = {
  render: () => <template>
    <Form @data={{hash birthday=""}} as |f|>
      <f.Date @name="birthday" @label="Birthday" placeholder="When are you born?" />
    </Form>
  </template>
};

export const Disabled: StoryObj = {
  render: () => <template>
    <Form @data={{hash birthday=""}} as |f|>
      <f.Date @name="birthday" @label="Birthday" @disabled={{true}} />
    </Form>
  </template>
};
