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

export const Area = () => {
  return {
    template: hbs`
      <TextArea @update={{fn this.type}} />
    `,
    context: {
      get type() {
        return action('type');
      }
    }
  };
};

export const Sizing = () => {
  return {
    template: hbs`
      <TextInput {{style fontSize="80%"}} @value="80% Font Size"/>
      <TextInput @value="Normal"/>
      <TextInput {{style fontSize="120%"}} @value="120% Font Size"/>
      <TextInput {{style fontSize="150%"}} @value="150% Font Size"/>
    `
  };
};

export const Builder = () => {
  return {
    template: hbs`
    <InputBuilder @control="text-input" as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Input @update={{this.type}}/>
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
