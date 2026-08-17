import { hash } from '@ember/helper';

import { Form } from '../form.gts';
import { baseArgTypes, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';
import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Form/MultipleChoice',
  component: Form,
  argTypes: baseArgTypes
} satisfies Meta;

export const Default: StoryObj<FieldArgs> = {
  render: (args) => <template>
    <Form @data={{hash pets=undefined}} @submit={{args.submit}} as |f|>
      <f.MultipleChoice
        @name="pets"
        @label={{args.label}}
        @description={{args.description}}
        @disabled={{args.disabled}}
        as |r|
      >
        <r.Option @value="rhino" @label="Rhino" required />
        <r.Option @value="tiger" @label="Tiger" />
        <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
        <r.Option @value="kangaroo" @label="Kangaroo" />
      </f.MultipleChoice>
      <f.Submit>Send</f.Submit>
    </Form>
  </template>,
  args: {
    label: 'Which Pets do you own?'
  },

  decorators: [(story, { args }) => story(parseArgs(args))]
};

export const Description: StoryObj = {
  render: () => <template>
    <Form @data={{hash pets=""}} as |f|>
      <f.MultipleChoice
        @name="pets"
        @label="Which Pets do you own?"
        @description="Maybe some wild ones?"
        as |r|
      >
        <r.Option @value="rhino" @label="Rhino" required />
        <r.Option
          @value="tiger"
          @label="Tiger"
          disabled
          @description="This one seems unrealistic, no?"
        />
        <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
        <r.Option @value="kangaroo" @label="Kangaroo" />
      </f.MultipleChoice>
    </Form>
  </template>
};

export const Disabled: StoryObj = {
  render: () => <template>
    <Form @data={{hash pets=""}} as |f|>
      <f.MultipleChoice @name="pets" @label="Which Pets do you own?" @disabled={{true}} as |r|>
        <r.Option @value="rhino" @label="Rhino" />
        <r.Option @value="tiger" @label="Tiger" />
        <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
        <r.Option @value="kangaroo" @label="Kangaroo" />
      </f.MultipleChoice>
    </Form>
  </template>
};
