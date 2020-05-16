import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components|Inputs/Number',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = () => {
  return {
    template: hbs`
      <NumberInput @update={{fn this.type}} />
    `,
    context: {
      get type() {
        return action('type');
      }
    }
  };
};

Default.story = {
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=404%3A369'
    }
  }
};

export const Sizing = () => {
  return {
    template: hbs`
      <NumberInput {{style fontSize="80%"}} @value="80"/>
      <NumberInput @value="100"/>
      <NumberInput {{style fontSize="120%"}} @value="120"/>
      <NumberInput {{style fontSize="150%"}} @value="150"/>
    `
  };
};

export const Builder = () => {
  return {
    template: hbs`
    <InputBuilder @control="number-input" as |b|>
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
