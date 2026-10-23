import { hbs } from 'ember-cli-htmlbars';

import { baseArgTypes, parseArgs } from './stories-utils.ts';

import type { FieldArgs } from './stories-utils.ts';

export default {
  title: 'Components/Form/SingularChoice',
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
      <Form @data={{hash graduation=undefined}} @submit={{this.submit}} as |f|>
        <f.SingularChoice
          @name="graduation"
          @label={{this.label}}
          @description={{this.description}}
          @disabled={{this.disabled}}
          as |r|>
          <r.Option @value="doctor" @label="Doktor" required={{this.required}} />
          <r.Option @value="diploma" @label="Diplom" />
          <r.Option @value="master" @label="Master" />
          <r.Option @value="bachelor" @label="Bachelor" />
          <r.Option @value="apprenticeship" @label="Ausbildung" />
          <r.Option @value="matura" @label="Abitur" />
        </f.SingularChoice>
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
    label: 'Graduation'
  }
};

export const Description = {
  render: () => {
    return {
      template: hbs`
        <Form @data={{hash graduation=''}} as |f|>
          <f.SingularChoice @name="graduation" @label="Graduation" @description="Which degree have you graduated in?" as |r|>
            <r.Option @value="doctor" @label="Doktor" required={{this.required}} />
            <r.Option @value="diploma" @label="Diplom" />
            <r.Option @value="master" @label="Master" />
            <r.Option @value="bachelor" @label="Bachelor" />
            <r.Option @value="apprenticeship" @label="Ausbildung" />
            <r.Option @value="matura" @label="Abitur" />
          </f.SingularChoice>
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
        <Form @data={{hash graduation=''}} as |f|>
          <f.SingularChoice @name="graduation" @label="Graduation" @disabled={{true}} as |r|>
            <r.Option @value="doctor" @label="Doktor" required={{this.required}} />
            <r.Option @value="diploma" @label="Diplom" />
            <r.Option @value="master" @label="Master" />
            <r.Option @value="bachelor" @label="Bachelor" />
            <r.Option @value="apprenticeship" @label="Ausbildung" />
            <r.Option @value="matura" @label="Abitur" />
          </f.SingularChoice>
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
