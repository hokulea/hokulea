import { hbs } from 'ember-cli-htmlbars';

import { argTypesWithPlaceholder, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';

export default {
  title: 'Components/Form/Number',
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
      <Form @data={{hash age=undefined}} @submit={{this.submit}} as |f|>
        <f.Number
          @name="age"
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
    label: 'How old are you?'
  }
};

export const Description = {
  render: () => {
    return {
      template: hbs`
        <Form @data={{hash age=''}} as |f|>
          <f.Number @name="age" @label="How old are you?" @description="Age in Years" />
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
        <Form @data={{hash age=''}} as |f|>
          <f.Number @name="age" @label="How old are you?" placeholder="Age in Years" />
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
        <Form @data={{hash age=''}} as |f|>
          <f.Number @name="age" @label="How old are you?" @disabled={{true}} />
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
