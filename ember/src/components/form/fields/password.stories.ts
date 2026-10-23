import { hbs } from 'ember-cli-htmlbars';

import * as v from 'valibot';

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

export const Rules = {
  render: () => {
    return {
      template: hbs`
        <Form as |f|>
          <f.Password @name="password" @label="Password" @validate={{this.passwordSchema}} required>
            <:rules as |Rule|>
              <Rule @key="type" @value="min_length">must be at least 8 characters</Rule>
              <Rule @key="message" @value="upper">must contain at least one uppercase letter</Rule>
              <Rule @key="message" @value="lower">must contain at least one lowercase letter</Rule>
              <Rule @key="message" @value="number">must contain at least one number</Rule>
              <Rule @key="message" @value="special">must contain at least one special character</Rule>
            </:rules>
          </f.Password>
        </Form>
      `,
      context: {
        passwordSchema: v.pipe(
          v.optional(v.string(), ''),
          v.string(),
          v.minLength(8),
          v.regex(/[A-Z]/, 'upper'),
          v.regex(/[a-z]/, 'lower'),
          v.regex(/[0-9]/, 'number'),
          v.regex(/[^A-Za-z0-9]/, 'special')
        )
      }
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
