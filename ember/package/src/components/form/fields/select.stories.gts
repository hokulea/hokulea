import { hash } from '@ember/helper';

import { type FieldArgs, fieldArgTypes, parseFieldArgs } from '#storybook';

import { Form } from '../form.gts';
import { SelectField } from './select.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Form/SelectField',
  component: SelectField,
  argTypes: fieldArgTypes
} satisfies Meta;

export const Default: StoryObj<FieldArgs> = {
  render: (args) => <template>
    <Form @data={{hash fruit=undefined}} @submit={{args.submit}} as |f|>
      <f.Select
        @name="fruit"
        @label={{args.label}}
        @description={{args.description}}
        @disabled={{args.disabled}}
        required={{args.required}}
        as |s|
      >
        <s.Option @value="" />
        <s.Option @value="Apple" />
        <s.Option @value="Banana" />
        <s.Option @value="Pear">🍐 Pear</s.Option>
      </f.Select>
      <f.Submit>Send</f.Submit>
    </Form>
  </template>,
  args: {
    label: 'Favorite Fruit'
  },

  decorators: [(story, { args }) => story(parseFieldArgs(args))]
};

export const Description: StoryObj = {
  render: () => <template>
    <Form @data={{hash fruit=""}} as |f|>
      <f.Select
        @name="fruit"
        @label="Favorite Fruit"
        @description="What's most delicious to you?"
        as |s|
      >
        <s.Option @value="Apple" />
        <s.Option @value="Banana" />
        <s.Option @value="Pear">🍐 Pear</s.Option>
      </f.Select>
    </Form>
  </template>
};

export const Disabled: StoryObj = {
  render: () => <template>
    <Form @data={{hash fruit=""}} as |f|>
      <f.Select @name="fruit" @label="Favorite Fruit" @disabled={{true}} as |s|>
        <s.Option @value="Apple" />
        <s.Option @value="Banana" />
        <s.Option @value="Pear">🍐 Pear</s.Option>
      </f.Select>
    </Form>
  </template>
};
