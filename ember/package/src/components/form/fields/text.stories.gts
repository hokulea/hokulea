import { hash } from '@ember/helper';

import { type FieldArgs, fieldArgTypesWithPlaceholder, parseFieldArgs } from '#storybook';

import { Form } from '../form.gts';
import { TextField } from './text.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Form/TextField',
  component: TextField,
  argTypes: fieldArgTypesWithPlaceholder
} satisfies Meta;

export const Default: StoryObj<FieldArgs> = {
  render: (args) => <template>
    <Form @data={{hash givenName=undefined}} @submit={{args.submit}} as |f|>
      <f.Text
        @name="givenName"
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
    label: 'Given Name'
  },

  decorators: [(story, { args }) => story(parseFieldArgs(args))]
};

export const Description: StoryObj = {
  render: () => <template>
    <Form @data={{hash givenName=""}} as |f|>
      <f.Text @name="givenName" @label="Given Name" @description="How you like to be called?" />
    </Form>
  </template>
};

export const Placeholder: StoryObj = {
  render: () => <template>
    <Form @data={{hash givenName=""}} as |f|>
      <f.Text @name="givenName" @label="Given Name" placeholder="How you like to be called?" />
    </Form>
  </template>
};

export const Disabled: StoryObj = {
  render: () => <template>
    <Form @data={{hash givenName=""}} as |f|>
      <f.Text @name="givenName" @label="Given Name" @disabled={{true}} />
    </Form>
  </template>
};
