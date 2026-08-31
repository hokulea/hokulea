import { hash } from '@ember/helper';

import { Form } from '../form.gts';
import { ListField } from './list.gts';
import { baseArgTypes, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';
import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Form/ListField',
  component: ListField,
  argTypes: baseArgTypes
} satisfies Meta;

export const Default: StoryObj<FieldArgs> = {
  render: (args) => <template>
    <Form @data={{hash fruit=undefined}} @submit={{args.submit}} as |f|>
      <f.List
        @name="fruit"
        @label={{args.label}}
        @description={{args.description}}
        @disabled={{args.disabled}}
        as |l|
      >
        <l.Option @value="Apple">Apple</l.Option>
        <l.Option @value="Banana">Banana</l.Option>
        <l.Option @value="Pear">🍐 Pear</l.Option>
      </f.List>
      <f.Submit>Send</f.Submit>
    </Form>
  </template>,
  args: {
    label: 'Favorite Fruit'
  },

  decorators: [(story, { args }) => story(parseArgs(args))]
};

export const Description: StoryObj = {
  render: () => <template>
    <Form @data={{hash fruit=""}} as |f|>
      <f.List
        @name="fruit"
        @label="Favorite Fruit"
        @description="What's most delicious to you?"
        as |l|
      >
        <l.Option @value="Apple">Apple</l.Option>
        <l.Option @value="Banana">Banana</l.Option>
        <l.Option @value="Pear">🍐 Pear</l.Option>
      </f.List>
    </Form>
  </template>
};

export const Disabled: StoryObj = {
  render: () => <template>
    <Form @data={{hash fruit=""}} as |f|>
      <f.List @name="fruit" @label="Favorite Fruit" @disabled={{true}} as |l|>
        <l.Option @value="Apple">Apple</l.Option>
        <l.Option @value="Banana">Banana</l.Option>
        <l.Option @value="Pear">🍐 Pear</l.Option>
      </f.List>
    </Form>
  </template>
};
