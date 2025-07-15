import { hbs } from 'ember-cli-htmlbars';

import { argTypesWithPlaceholder, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';

export default {
  title: 'Components/Form/Text',
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
      <Form @data={{hash givenName=undefined}} @submit={{this.submit}} as |f|>
        <f.Text
          @name="givenName"
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
    label: 'Given Name'
  }
};

export const Description = {
  render: () => {
    return {
      template: hbs`
        <Form @data={{hash givenName=''}} as |f|>
          <f.Text @name="givenName" @label="Given Name" @description="How you like to be called?" />
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
        <Form @data={{hash givenName=''}} as |f|>
          <f.Text @name="givenName" @label="Given Name" placeholder="How you like to be called?" />
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
        <Form @data={{hash givenName=''}} as |f|>
          <f.Text @name="givenName" @label="Given Name" @disabled={{true}} />
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
