import { hbs } from 'ember-cli-htmlbars';

import { boolean, number, withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Components/Layouts/Switcher',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = () => ({
  template: hbs`
      <SwitcherLayout @limit={{if this.useLimit this.limit}}>
        {{#each this.boxes as |number|}}
          <BoxLayout>Box {{number}}</BoxLayout>
        {{/each}}
      </SwitcherLayout>`,
  context: {
    get boxes() {
      return [...[number('boxes', 6)].keys()].map(k => k + 1);
    },

    get limit() {
      return number('limit', 3, {
        range: true,
        min: 2,
        max: 4,
        step: 1
      });
    },

    get useLimit() {
      return boolean('use limit', false);
    }
  }
});

Default.story = {
  decorators: [withKnobs]
};
