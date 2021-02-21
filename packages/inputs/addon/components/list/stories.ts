import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
// import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Inputs/List',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = () => ({
  template: hbs`
      <List @items={{array "apple" "banana" "orange"}} @select={{this.select}} as |item|>
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
        @items={{array "apple" "banana" "orange"}}
        @selection={{array "banana"}}
        @select={{this.select}}
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
