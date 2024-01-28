import { hbs } from 'ember-cli-htmlbars';
import { parseArgs, argTypesWithPlaceholder } from './stories-utils';

import type { FieldArgs } from './stories-utils';

export default {
  title: 'Components/Form/Currency',
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
      <Form @data={{hash salary=undefined}} @submit={{this.submit}} as |f|>
        <f.Currency
          @name="salary"
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
  label: 'Salary'
};

export const Description = () => {
  return {
    template: hbs`
      <Form @data={{hash salary=''}} as |f|>
        <f.Currency @name="salary" @label="Salary" @description="Your yearly gross" />
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
      <Form @data={{hash salary=''}} as |f|>
        <f.Currency @name="salary" @label="Salary" placeholder="Your yearly gross" />
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
      <Form @data={{hash salary=''}} as |f|>
        <f.Currency @name="salary" @label="Salary" @disabled={{true}} />
      </Form>
    `
  };
};

Disabled.parameters = {
  options: {
    showPanel: false
  }
};
