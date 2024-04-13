import { hbs } from 'ember-cli-htmlbars';

import { baseArgTypes, parseArgs } from './stories-utils';

import type { FieldArgs } from './stories-utils';

export default {
  title: 'Components/Form/List',
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
        <f.List
          @name="fruit"
          @label={{this.label}}
          @description={{this.description}}
          @disabled={{this.disabled}}
          placeholder={{this.placeholder}}
          required={{this.required}}
        as |l|>
          <l.Option @value="Apple">Apple</l.Option>
          <l.Option @value="Banana">Banana</l.Option>
          <l.Option @value="Pear">🍐 Pear</l.Option>
        </f.List>
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
          <f.List @name="fruit" @label="Favorite Fruit" @description="What's most delicious to you?" as |l|>
            <l.Option @value="Apple">Apple</l.Option>
            <l.Option @value="Banana">Banana</l.Option>
            <l.Option @value="Pear">🍐 Pear</l.Option>
          </f.List>
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
          <f.List @name="fruit" @label="Favorite Fruit" @disabled={{true}} as |l|>
            <l.Option @value="Apple">Apple</l.Option>
            <l.Option @value="Banana">Banana</l.Option>
            <l.Option @value="Pear">🍐 Pear</l.Option>
          </f.List>
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
