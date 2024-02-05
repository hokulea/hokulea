import { hbs } from 'ember-cli-htmlbars';

import { argTypesWithPlaceholder, parseArgs } from './stories-utils';

import type { FieldArgs } from './stories-utils';

export default {
  title: 'Components/Form/Date',
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
      <Form @data={{hash birthday=undefined}} @submit={{this.submit}} as |f|>
        <f.Date
          @name="birthday"
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
    label: 'Birthday'
  }
};

export const Description = {
  render: () => {
    return {
      template: hbs`
        <Form @data={{hash birthday=''}} as |f|>
          <f.Date @name="birthday" @label="Birthday" @description="When are you born?" />
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
      <Form @data={{hash birthday=''}} as |f|>
        <f.Date @name="birthday" @label="Birthday" placeholder="When are you born?" />
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
      <Form @data={{hash birthday=''}} as |f|>
        <f.Date @name="birthday" @label="Birthday" @disabled={{true}} />
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
