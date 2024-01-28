import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
// import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Controls/List',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  },
  controls: { hideNoControlsWarning: true }
};

export const Default = () => ({
  template: hbs`
      <List @options={{array "apple" "banana" "orange"}} @update={{this.select}} as |item|>
        {{item}}
      </List>
    `,
  context: {
    update: action('checked'),
    select: action('select')
  }
});

// Default.story = {
//   decorators: [withDesign],
//   parameters: {
//     design: {
//       type: 'figma',
//       url:
//         'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Hokulea?node-id=575%3A9'
//     }
//   }
// };

export const MultiSelect = () => ({
  template: hbs`
      <List
        @options={{array "apple" "banana" "orange"}}
        @value={{array "banana"}}
        @update={{this.select}}
        aria-multiselectable="true"
      as |item|>
        {{item}}
      </List>
    `,
  context: {
    update: action('checked'),
    select: action('select')
  }
});
