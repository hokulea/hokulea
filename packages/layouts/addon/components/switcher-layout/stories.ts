import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components/Layouts/Switcher',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = args => ({
  template: hbs`
      <SwitcherLayout @limit={{if this.useLimit this.limit}}>
        {{#each this.boxes as |number|}}
          <BoxLayout>Box {{number}}</BoxLayout>
        {{/each}}
      </SwitcherLayout>`,
  context: {
    boxes: [...[args.boxes].keys()].map(k => k + 1),
    limit: args.limit,
    useLimit: args.useLimit
  }
});

Default.argTypes = {
  boxes: {
    name: '# of boxes',
    defaultValue: 6,
    control: { type: 'number' }
  },
  limit: {
    name: 'limit',
    defaultValue: 3,
    control: { type: 'range', min: 2, max: 4, step: 1 }
  },
  useLimit: {
    name: 'use limit',
    defaultValue: false,
    control: { type: 'boolean' }
  }
};
