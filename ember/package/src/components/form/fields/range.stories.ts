import { hbs } from 'ember-cli-htmlbars';

import { baseArgTypes, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';

export default {
  title: 'Components/Form/Range',
  component: '',
  parameters: {
    options: {
      showPanel: true,
      showToolbar: true
    }
  }
};

const rangeArgTypes = {
  ...baseArgTypes,
  min: {
    name: 'min',
    control: 'number'
  },
  max: {
    name: 'max',
    control: 'number'
  },
  step: {
    name: 'step',
    control: 'text'
  }
};

const Template = (args: FieldArgs) => {
  return {
    template: hbs`
      <Form @data={{hash fruitAmount=undefined}} @submit={{this.submit}} as |f|>
        <f.Range
          @name="fruitAmount"
          @label={{this.label}}
          @description={{this.description}}
          @disabled={{this.disabled}}
          placeholder={{this.placeholder}}
          required={{this.required}}
          min={{this.min}}
          max={{this.max}}
          step={{this.step}}
        />
        <f.Submit>Send</f.Submit>
      </Form>
    `,
    context: parseArgs(args)
  };
};

export const Default = {
  render: Template,
  argTypes: rangeArgTypes,

  args: {
    label: 'How many fruits do you want?'
  }
};

export const Description = {
  render: () => {
    return {
      template: hbs`
        <Form @data={{hash fruitAmount=undefined}} as |f|>
          <f.Range @name="fruitAmount" @label="How many fruits do you want?" @description="You have chosen a fruit before, don't you?" />
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
        <Form @data={{hash fruitAmount=undefined}} as |f|>
          <f.Range @name="fruitAmount" @label="How many fruits do you want?" placeholder="You have chosen a fruit before, don't you?" />
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
        <Form @data={{hash fruitAmount=undefined}} as |f|>
          <f.Range @name="fruitAmount" @label="How many fruits do you want?" @disabled={{true}} />
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
