import { hash } from '@ember/helper';

import { Form } from '../form.gts';
import { baseArgTypes, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';
import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Form/SingularChoiceField',
  component: Form,
  argTypes: baseArgTypes
} satisfies Meta;

export const Default: StoryObj<FieldArgs> = {
  render: (args) => <template>
    <Form @data={{hash graduation=undefined}} @submit={{args.submit}} as |f|>
      <f.SingularChoice
        @name="graduation"
        @label={{args.label}}
        @description={{args.description}}
        @disabled={{args.disabled}}
        as |r|
      >
        <r.Option @value="doctor" @label="Doktor" required={{args.required}} />
        <r.Option @value="diploma" @label="Diplom" />
        <r.Option @value="master" @label="Master" />
        <r.Option @value="bachelor" @label="Bachelor" />
        <r.Option @value="apprenticeship" @label="Ausbildung" />
        <r.Option @value="matura" @label="Abitur" />
      </f.SingularChoice>
      <f.Submit>Send</f.Submit>
    </Form>
  </template>,
  args: {
    label: 'Graduation'
  },

  decorators: [(story, { args }) => story(parseArgs(args))]
};

export const Description: StoryObj = {
  render: () => <template>
    <Form @data={{hash graduation=""}} as |f|>
      <f.SingularChoice
        @name="graduation"
        @label="Graduation"
        @description="Which degree have you graduated in?"
        as |r|
      >
        <r.Option @value="doctor" @label="Doktor" required={{true}} />
        <r.Option @value="diploma" @label="Diplom" />
        <r.Option @value="master" @label="Master" />
        <r.Option @value="bachelor" @label="Bachelor" />
        <r.Option @value="apprenticeship" @label="Ausbildung" />
        <r.Option @value="matura" @label="Abitur" />
      </f.SingularChoice>
    </Form>
  </template>
};

export const Disabled: StoryObj = {
  render: () => <template>
    <Form @data={{hash graduation=""}} as |f|>
      <f.SingularChoice @name="graduation" @label="Graduation" @disabled={{true}} as |r|>
        <r.Option @value="doctor" @label="Doktor" required={{true}} />
        <r.Option @value="diploma" @label="Diplom" />
        <r.Option @value="master" @label="Master" />
        <r.Option @value="bachelor" @label="Bachelor" />
        <r.Option @value="apprenticeship" @label="Ausbildung" />
        <r.Option @value="matura" @label="Abitur" />
      </f.SingularChoice>
    </Form>
  </template>
};
