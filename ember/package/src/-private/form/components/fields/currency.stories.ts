import { hbs } from 'ember-cli-htmlbars';

import { argTypesWithPlaceholder, parseArgs } from './stories-utils';

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

export const Default = {
  render: Template.bind({}),
  argTypes: argTypesWithPlaceholder,

  args: {
    label: 'Salary'
  }
};

export const Description = {
  render: () => {
    return {
      template: hbs`
      <Form @data={{hash salary=''}} as |f|>
        <f.Currency @name="salary" @label="Salary" @description="Your yearly gross" />
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

export const Placeholder = {
  render: () => {
    return {
      template: hbs`
      <Form @data={{hash salary=''}} as |f|>
        <f.Currency @name="salary" @label="Salary" placeholder="Your yearly gross" />
      </Form>
    `
    };
  },

  parameter: {
    options: {
      showPanel: false
    }
  }
};

export const Disabled = {
  render: () => {
    return {
      template: hbs`
      <Form @data={{hash salary=''}} as |f|>
        <f.Currency @name="salary" @label="Salary" @disabled={{true}} />
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
