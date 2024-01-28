import { hbs } from 'ember-cli-htmlbars';
import { parseArgs, argTypesWithPlaceholder } from './stories-utils';

import type { FieldArgs } from './stories-utils';

export default {
  title: 'Components/Form/Date',
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
      <Form @data={{hash birthday=undefined}} @submit={{this.submit}} as |f|>
        <f.Date
          @name="birthday"
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
  label: 'Birthday'
};

export const Description = () => {
  return {
    template: hbs`
      <Form @data={{hash birthday=''}} as |f|>
        <f.Date @name="birthday" @label="Birthday" @description="When are you born?" />
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
      <Form @data={{hash birthday=''}} as |f|>
        <f.Date @name="birthday" @label="Birthday" placeholder="When are you born?" />
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
      <Form @data={{hash birthday=''}} as |f|>
        <f.Date @name="birthday" @label="Birthday" @disabled={{true}} />
      </Form>
    `
  };
};

Disabled.parameters = {
  options: {
    showPanel: false
  }
};
