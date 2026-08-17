import { hash } from '@ember/helper';

import { Form } from '../form.gts';
import { argTypesWithPlaceholder, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';
import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Form/Currency',
  component: Form,
  argTypes: argTypesWithPlaceholder
} satisfies Meta;

export const Default: StoryObj<FieldArgs> = {
  render: (args) => <template>
    <Form @data={{hash price=undefined}} @submit={{args.submit}} as |f|>
      <f.Currency
        @name="price"
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
    label: 'Price'
  },

  decorators: [(story, { args }) => story(parseArgs(args))]
};

export const Description: StoryObj = {
  render: () => <template>
    <Form @data={{hash price=""}} as |f|>
      <f.Currency @name="price" @label="Price" @description="What does it cost?" />
    </Form>
  </template>
};

export const Placeholder: StoryObj = {
  render: () => <template>
    <Form @data={{hash price=""}} as |f|>
      <f.Currency @name="price" @label="Price" placeholder="What does it cost?" />
    </Form>
  </template>
};

export const Disabled: StoryObj = {
  render: () => <template>
    <Form @data={{hash price=""}} as |f|>
      <f.Currency @name="price" @label="Price" @disabled={{true}} />
    </Form>
  </template>
};
