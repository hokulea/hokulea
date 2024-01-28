import { hbs } from 'ember-cli-htmlbars';
import { parseArgs, argTypesWithPlaceholder } from './stories-utils';

import type { FieldArgs } from './stories-utils';

export default {
  title: 'Components/Form/TextArea',
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
      <Form @data={{hash comment=undefined}} @submit={{this.submit}} as |f|>
        <f.TextArea
          @name="comment"
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

export const Default = Template.bind({});
Default.argTypes = argTypesWithPlaceholder;
Default.args = {
  label: 'Comment'
};

export const Description = () => {
  return {
    template: hbs`
      <Form @data={{hash comment=''}} as |f|>
        <f.TextArea @name="comment" @label="Comment" @description="Share your thoughts with us" />
      </Form>
    `
  };
};

Description.parameters = {
  options: {
    showPanel: false
  }
};

export const Placeholder = () => {
  return {
    template: hbs`
      <Form @data={{hash comment=''}} as |f|>
        <f.TextArea @name="comment" @label="Comment" placeholder="Share your thoughts with us" />
      </Form>
    `
  };
};

Placeholder.parameters = {
  options: {
    showPanel: false
  }
};

export const Disabled = () => {
  return {
    template: hbs`
      <Form @data={{hash comment=''}} as |f|>
        <f.TextArea @name="comment" @label="Comment" @disabled={{true}} />
      </Form>
    `
  };
};

Disabled.parameters = {
  options: {
    showPanel: false
  }
};
