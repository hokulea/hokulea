import { hbs } from 'ember-cli-htmlbars';

import { argTypesWithPlaceholder, parseArgs } from './stories-utils';

import type { FieldArgs } from './stories-utils';

export default {
  title: 'Components/Form/Text',
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
      <Form @data={{hash givenName=undefined}} @submit={{this.submit}} as |f|>
        <f.Text
          @name="givenName"
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
  label: 'Given Name'
};

export const Description = () => {
  return {
    template: hbs`
      <Form @data={{hash givenName=''}} as |f|>
        <f.Text @name="givenName" @label="Given Name" @description="How you like to be called?" />
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
      <Form @data={{hash givenName=''}} as |f|>
        <f.Text @name="givenName" @label="Given Name" placeholder="How you like to be called?" />
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
      <Form @data={{hash givenName=''}} as |f|>
        <f.Text @name="givenName" @label="Given Name" @disabled={{true}} />
      </Form>
    `
  };
};

Disabled.parameters = {
  options: {
    showPanel: false
  }
};
