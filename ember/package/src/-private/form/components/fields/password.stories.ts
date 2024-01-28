import { hbs } from 'ember-cli-htmlbars';
import { parseArgs, argTypesWithPlaceholder } from './stories-utils';

import type { FieldArgs } from './stories-utils';

export default {
  title: 'Components/Form/Password',
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
      <Form @data={{hash password=undefined}} @submit={{this.submit}} as |f|>
        <f.Password
          @name="password"
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
  label: 'Your Password'
};

export const Description = () => {
  return {
    template: hbs`
      <Form @data={{hash password=''}} as |f|>
        <f.Password @name="password" @label="Your Password" @description="It's a secret" />
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
      <Form @data={{hash password=''}} as |f|>
        <f.Password @name="password" @label="Your Password" placeholder="It's a secret" />
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
      <Form @data={{hash password=''}} as |f|>
        <f.Password @name="password" @label="Your Password" @disabled={{true}} />
      </Form>
    `
  };
};

Disabled.parameters = {
  options: {
    showPanel: false
  }
};
