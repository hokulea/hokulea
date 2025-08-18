import { hbs } from 'ember-cli-htmlbars';

import { baseArgTypes, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';

export default {
  title: 'Components/Form/Select',
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
      <Form @data={{hash fruit=undefined}} @submit={{this.submit}} as |f|>
        <f.Select
          @name="fruit"
          @label={{this.label}}
          @description={{this.description}}
          @disabled={{this.disabled}}
          placeholder={{this.placeholder}}
          required={{this.required}}
        as |s|>
          <s.Option @value="" />
          <s.Option @value="Apple" />
          <s.Option @value="Banana" />
          <s.Option @value="Pear">🍐 Pear</s.Option>
        </f.Select>
        <f.Submit>Send</f.Submit>
      </Form>
    `,
    context: parseArgs(args)
  };
};

export const Default = {
  render: Template,
  argTypes: baseArgTypes,

  args: {
    label: 'Favorite Fruit'
  }
};

export const Description = {
  render: () => {
    return {
      template: hbs`
        <Form @data={{hash fruit=''}} as |f|>
          <f.Select @name="fruit" @label="Favorite Fruit" @description="What's most delicious to you?" as |s|>
            <s.Option @value="Apple" />
            <s.Option @value="Banana" />
            <s.Option @value="Pear">🍐 Pear</s.Option>
          </f.Select>
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
        <Form @data={{hash fruit=''}} as |f|>
          <f.Select @name="fruit" @label="Favorite Fruit" @disabled={{true}} as |s|>
            <s.Option @value="Apple" />
            <s.Option @value="Banana" />
            <s.Option @value="Pear">🍐 Pear</s.Option>
          </f.Select>
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
