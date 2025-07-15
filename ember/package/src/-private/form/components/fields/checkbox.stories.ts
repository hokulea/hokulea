import { hbs } from 'ember-cli-htmlbars';

import { baseArgTypes, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';

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

export const Showcase = {
  render: Template.bind({}),
  argTypes: baseArgTypes,

  args: {
    label: 'I agree to Terms and Conditions'
  }
};

export const Description = {
  render: () => {
    return {
      template: hbs`
        <Form @data={{hash terms=''}} as |f|>
          <f.Checkbox @name="terms" @label="I agree to Terms and Conditions" @description="I really do!" />
        </Form>
      `
    };
  },

  parameters: {
    options: {
      showPanel: false
    }
  }
};

export const Disabled = {
  render: () => {
    return {
      template: hbs`
        <Form @data={{hash terms=''}} as |f|>
          <f.Checkbox @name="terms" @label="I agree to Terms and Conditions" @disabled={{true}} />
        </Form>
      `
    };
  },

  parameters: {
    options: {
      showPanel: false
    }
  }
};
