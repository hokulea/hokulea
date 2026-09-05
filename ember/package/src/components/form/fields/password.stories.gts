import { hash } from '@ember/helper';

import * as v from 'valibot';

import { type FieldArgs, fieldArgTypesWithPlaceholder, parseFieldArgs } from '#storybook';

import { Form } from '../form.gts';
import { PasswordField } from './password.gts';

import type { Meta, StoryObj } from 'ember-storybook';

const passwordSchema = v.pipe(
  v.optional(v.string(), ''),
  v.string(),
  v.minLength(8),
  v.regex(/[A-Z]/, 'upper'),
  v.regex(/[a-z]/, 'lower'),
  v.regex(/[0-9]/, 'number'),
  v.regex(/[^A-Za-z0-9]/, 'special')
);

export default {
  title: 'Form/PasswordField',
  component: PasswordField,
  argTypes: fieldArgTypesWithPlaceholder
} satisfies Meta;

export const Default: StoryObj<FieldArgs> = {
  render: (args) => <template>
    <Form @data={{hash password=undefined}} @submit={{args.submit}} as |f|>
      <f.Password
        @name="password"
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
    label: 'Your Password'
  },

  decorators: [(story, { args }) => story(parseFieldArgs(args))]
};

export const Description: StoryObj = {
  render: () => <template>
    <Form @data={{hash password=""}} as |f|>
      <f.Password @name="password" @label="Your Password" @description="It's a secret" />
    </Form>
  </template>
};

export const Placeholder: StoryObj = {
  render: () => <template>
    <Form @data={{hash password=""}} as |f|>
      <f.Password @name="password" @label="Your Password" placeholder="It's a secret" />
    </Form>
  </template>
};

export const Rules: StoryObj = {
  render: () => <template>
    <Form as |f|>
      <f.Password @name="password" @label="Password" @validate={{passwordSchema}} required>
        <:rules as |Rule|>
          <Rule @key="type" @value="min_length">must be at least 8 characters</Rule>
          <Rule @key="message" @value="upper">must contain at least one uppercase letter</Rule>
          <Rule @key="message" @value="lower">must contain at least one lowercase letter</Rule>
          <Rule @key="message" @value="number">must contain at least one number</Rule>
          <Rule @key="message" @value="special">must contain at least one special character</Rule>
        </:rules>
      </f.Password>
    </Form>
  </template>
};

export const Disabled: StoryObj = {
  render: () => <template>
    <Form @data={{hash password=""}} as |f|>
      <f.Password @name="password" @label="Your Password" @disabled={{true}} />
    </Form>
  </template>
};
