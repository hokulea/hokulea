import { hbs } from 'ember-cli-htmlbars';

import { argTypesWithPlaceholder, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';

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

export const Default = {
  render: Template,
  argTypes: argTypesWithPlaceholder,

  args: {
    label: 'Email'
  }
};

export const Description = {
  render: () => {
    return {
      template: hbs`
        <Form @data={{hash email=''}} as |f|>
          <f.Email @name="email" @label="Email" @description="Your electronic contact information" />
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
        <Form @data={{hash email=''}} as |f|>
          <f.Email @name="email" @label="Email" placeholder="Your electronic contact information" />
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
        <Form @data={{hash email=''}} as |f|>
          <f.Email @name="email" @label="Email" @disabled={{true}} />
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
