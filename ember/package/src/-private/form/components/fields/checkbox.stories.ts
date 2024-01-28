import { hbs } from 'ember-cli-htmlbars';
import { parseArgs, baseArgTypes } from './stories-utils';

import type { FieldArgs } from './stories-utils';

export default {
  title: 'Components/Form/Checkbox',
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
      <Form @data={{hash terms=undefined}} @submit={{this.submit}} as |f|>
        <f.Checkbox
          @name="terms"
          @label={{this.label}}
          @description={{this.description}}
          @disabled={{this.disabled}}
          required={{this.required}}
        />
        <f.Submit>Send</f.Submit>
      </Form>
    `,
    context: parseArgs(args)
  };
};

export const Default = Template.bind({});
Default.argTypes = baseArgTypes;
Default.args = {
  label: 'I agree to Terms and Conditions'
};

export const Description = () => {
  return {
    template: hbs`
      <Form @data={{hash terms=''}} as |f|>
        <f.Checkbox @name="terms" @label="I agree to Terms and Conditions" @description="I really do!" />
      </Form>
    `
  };
};

Description.parameters = {
  options: {
    showPanel: false
  }
};

export const Disabled = () => {
  return {
    template: hbs`
      <Form @data={{hash terms=''}} as |f|>
        <f.Checkbox @name="terms" @label="I agree to Terms and Conditions" @disabled={{true}} />
      </Form>
    `
  };
};

Disabled.parameters = {
  options: {
    showPanel: false
  }
};
