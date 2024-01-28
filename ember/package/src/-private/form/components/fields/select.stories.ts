import { hbs } from 'ember-cli-htmlbars';
import { parseArgs, baseArgTypes } from './stories-utils';

import type { FieldArgs } from './stories-utils';

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

export const Default = Template.bind({});
Default.argTypes = baseArgTypes;
Default.args = {
  label: 'Favorite Fruit'
};

export const Description = () => {
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
};

Description.parameters = {
  options: {
    showPanel: false
  }
};

export const Disabled = () => {
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
};

Disabled.parameters = {
  options: {
    showPanel: false
  }
};
