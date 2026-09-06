import { Form } from './form.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Form/Form',
  component: Form
} satisfies Meta;

export const Default: StoryObj = {
  render: () => <template>
    <Form as |f|>
      <f.Text @name="givenName" @label="Given Name" />
      <f.Text @name="familyName" @label="Family Name" />

      <f.Submit>Submit</f.Submit>
    </Form>
  </template>
};
