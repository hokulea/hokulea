import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
// import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components|Inputs/Text'
};

export const Default = () => {
  return {
    template: hbs`
      <TextInput @update={{fn this.type}} />
    `,
    context: {
      get type() {
        return action('type');
      }
    }
  };
};

// Default.story = {
//   decorators: [withDesign],
//   parameters: {
//     design: {
//       type: 'figma',
//       url:
//         'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=106%3A9'
//     }
//   }
// };

export const Builder = () => {
  return {
    template: hbs`
    <InputBuilder @control="text-input" as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Input @update={{this.type}} class={{b.contentClass}}/>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </InputBuilder>
    `,
    context: {
      type(value: string) {
        action('type')(value);
      }
    }
  };
};
