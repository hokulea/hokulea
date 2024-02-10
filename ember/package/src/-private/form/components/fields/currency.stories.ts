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
      <Form @data={{hash price=undefined}} @submit={{this.submit}} as |f|>
        <f.Currency
          @name="price"
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
    label: 'Price'
  }
};

export const Description = {
  render: () => {
    return {
      template: hbs`
      <Form @data={{hash price=''}} as |f|>
        <f.Currency @name="price" @label="Price" @description="What does it cost?" />
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
      <Form @data={{hash price=''}} as |f|>
        <f.Currency @name="price" @label="Price" placeholder="What does it cost?" />
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
      <Form @data={{hash price=''}} as |f|>
        <f.Currency @name="price" @label="Price" @disabled={{true}} />
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
