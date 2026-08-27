import { hash } from '@ember/helper';

import { Form } from '../form.gts';
import { argTypesWithPlaceholder, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';
import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Form/PhoneField',
  component: Form,
  argTypes: argTypesWithPlaceholder
} satisfies Meta;

export const Default: StoryObj<FieldArgs> = {
  render: (args) => <template>
    <Form @data={{hash phone=undefined}} @submit={{args.submit}} as |f|>
      <f.Phone
        @name="phone"
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
    label: 'Phone'
  },

  decorators: [(story, { args }) => story(parseArgs(args))]
};

export const Description: StoryObj = {
  render: () => <template>
    <Form @data={{hash phone=""}} as |f|>
      <f.Phone @name="phone" @label="Phone" @description="How can we dial-in?" />
    </Form>
  </template>
};

export const Placeholder: StoryObj = {
  render: () => <template>
    <Form @data={{hash phone=""}} as |f|>
      <f.Phone @name="phone" @label="Phone" placeholder="How can we dial-in?" />
    </Form>
  </template>
};

export const Disabled: StoryObj = {
  render: () => <template>
    <Form @data={{hash phone=""}} as |f|>
      <f.Phone @name="phone" @label="Phone" @disabled={{true}} />
    </Form>
  </template>
};
