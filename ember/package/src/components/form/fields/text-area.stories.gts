import { hash } from '@ember/helper';

import { type FieldArgs, fieldArgTypesWithPlaceholder, parseFieldArgs } from '#storybook';

import { Form } from '../form.gts';
import { TextAreaField } from './text-area.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Form/TextAreaField',
  component: TextAreaField,
  argTypes: fieldArgTypesWithPlaceholder
} satisfies Meta;

export const Default: StoryObj<FieldArgs> = {
  render: (args) => <template>
    <Form @data={{hash comment=undefined}} @submit={{args.submit}} as |f|>
      <f.TextArea
        @name="comment"
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
    label: 'Comment'
  },

  decorators: [(story, { args }) => story(parseFieldArgs(args))]
};

export const Description: StoryObj = {
  render: () => <template>
    <Form @data={{hash comment=""}} as |f|>
      <f.TextArea @name="comment" @label="Comment" @description="Share your thoughts with us" />
    </Form>
  </template>
};

export const Placeholder: StoryObj = {
  render: () => <template>
    <Form @data={{hash comment=""}} as |f|>
      <f.TextArea @name="comment" @label="Comment" placeholder="Share your thoughts with us" />
    </Form>
  </template>
};

export const Disabled: StoryObj = {
  render: () => <template>
    <Form @data={{hash comment=""}} as |f|>
      <f.TextArea @name="comment" @label="Comment" @disabled={{true}} />
    </Form>
  </template>
};
