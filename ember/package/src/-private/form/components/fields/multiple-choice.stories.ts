import { hbs } from 'ember-cli-htmlbars';

import { baseArgTypes, parseArgs } from './stories-utils';

import type { FieldArgs } from './stories-utils';

export default {
  title: 'Components/Form/MultipleChoice',
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
      <Form @data={{hash pets=undefined}} @submit={{this.submit}} as |f|>
        <f.MultipleChoice
          @name="pets"
          @label={{this.label}}
          @description={{this.description}}
          @disabled={{this.disabled}}
          as |r|>
          <r.Option @value="rhino" @label="Rhino" required />
          <r.Option @value="tiger" @label="Tiger" />
          <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
          <r.Option @value="kangaroo" @label="Kangaroo" />
        </f.MultipleChoice>
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
    label: 'Which Pets do you own?'
  }
};

export const Description = {
  render: () => {
    return {
      template: hbs`
        <Form @data={{hash pets=''}} as |f|>
          <f.MultipleChoice @name="pets" @label="Which Pets do you own?" @description="Maybe some wild ones?" as |r|>
            <r.Option @value="rhino" @label="Rhino" required />
            <r.Option @value="tiger" @label="Tiger" disabled @description="This one seems unrealistic, no?" />
            <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
            <r.Option @value="kangaroo" @label="Kangaroo" />
          </f.MultipleChoice>
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
        <Form @data={{hash pets=''}} as |f|>
          <f.MultipleChoice @name="pets" @label="Which Pets do you own?" @disabled={{true}} as |r|>
            <r.Option @value="rhino" @label="Rhino" />
            <r.Option @value="tiger" @label="Tiger" />
            <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
            <r.Option @value="kangaroo" @label="Kangaroo" />
          </f.MultipleChoice>
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
