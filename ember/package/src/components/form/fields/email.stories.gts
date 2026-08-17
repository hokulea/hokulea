import { hash } from '@ember/helper';

import { Form } from '../form.gts';
import { argTypesWithPlaceholder, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';
import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Form/Email',
  component: Form,
  argTypes: argTypesWithPlaceholder
} satisfies Meta;

export const Default: StoryObj<FieldArgs> = {
  render: (args) => <template>
    <Form @data={{hash email=undefined}} @submit={{args.submit}} as |f|>
      <f.Email
        @name="email"
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
    label: 'Email'
  },

  decorators: [(story, { args }) => story(parseArgs(args))]
};

export const Description: StoryObj = {
  render: () => <template>
    <Form @data={{hash email=""}} as |f|>
      <f.Email @name="email" @label="Email" @description="Your electronic contact information" />
    </Form>
  </template>
};

export const Placeholder: StoryObj = {
  render: () => <template>
    <Form @data={{hash email=""}} as |f|>
      <f.Email @name="email" @label="Email" placeholder="Your electronic contact information" />
    </Form>
  </template>
};

export const Disabled: StoryObj = {
  render: () => <template>
    <Form @data={{hash email=""}} as |f|>
      <f.Email @name="email" @label="Email" @disabled={{true}} />
    </Form>
  </template>
};
