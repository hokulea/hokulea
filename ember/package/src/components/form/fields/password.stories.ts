import { hbs } from 'ember-cli-htmlbars';

import { argTypesWithPlaceholder, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';

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

export const Default = {
  render: Template,
  argTypes: argTypesWithPlaceholder,

  args: {
    label: 'Your Password'
  }
};

export const Description = {
  render: () => {
    return {
      template: hbs`
        <Form @data={{hash password=''}} as |f|>
          <f.Password @name="password" @label="Your Password" @description="It's a secret" />
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
        <Form @data={{hash password=''}} as |f|>
          <f.Password @name="password" @label="Your Password" placeholder="It's a secret" />
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
        <Form @data={{hash password=''}} as |f|>
          <f.Password @name="password" @label="Your Password" @disabled={{true}} />
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
