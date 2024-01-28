import { hbs } from 'ember-cli-htmlbars';
import { parseArgs, argTypesWithPlaceholder } from './stories-utils';

import type { FieldArgs } from './stories-utils';

export default {
  title: 'Components/Form/Email',
  component: '',
  parameters: {
    options: {
      showPanel: true,
      showToolbar: true
    }
  }
};

const Template = (args: FieldArgs) => {
  return {
    template: hbs`
      <Form @data={{hash email=undefined}} @submit={{this.submit}} as |f|>
        <f.Email
          @name="email"
          @label={{this.label}}
          @description={{this.description}}
          @disabled={{this.disabled}}
          placeholder={{this.placeholder}}
          required={{this.required}}
        />
        <f.Submit>Send</f.Submit>
      </Form>
    `,
    context: parseArgs(args)
  };
};

export const Default = Template.bind({});
Default.argTypes = argTypesWithPlaceholder;
Default.args = {
  label: 'Email'
};

export const Description = () => {
  return {
    template: hbs`
      <Form @data={{hash email=''}} as |f|>
        <f.Email @name="email" @label="Email" @description="Your electronic contact information" />
      </Form>
    `
  };
};

Description.parameters = {
  options: {
    showPanel: false
  }
};

export const Placeholder = () => {
  return {
    template: hbs`
      <Form @data={{hash email=''}} as |f|>
        <f.Email @name="email" @label="Email" placeholder="Your electronic contact information" />
      </Form>
    `
  };
};

Placeholder.parameters = {
  options: {
    showPanel: false
  }
};

export const Disabled = () => {
  return {
    template: hbs`
      <Form @data={{hash email=''}} as |f|>
        <f.Email @name="email" @label="Email" @disabled={{true}} />
      </Form>
    `
  };
};

Disabled.parameters = {
  options: {
    showPanel: false
  }
};
