import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Buttons/Adjacent',
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
      <AdjacentButton {{invoke (fn this.invoke)}}>Adjacent Button</AdjacentButton>
      <AdjacentButton disabled={{true}}>Disabled Adjacent Button</AdjacentButton>
    `,
    context: {
      invoke: action('button invoked')
    }
  };
};

Default.story = {
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=404%3A0'
    }
  }
};

export const Accessibility = () => {
  return {
    template: hbs`
      <AdjacentButton aria-label="Go Tomster!">
        <span aria-hidden="true">🐹</span>
      </AdjacentButton>
    `
  };
};

Accessibility.story = {
  name: 'A11y'
};

export const Sizing = () => {
  return {
    template: hbs`
      <AdjacentButton {{style fontSize="80%"}}>80% Font Size</AdjacentButton>
      <AdjacentButton>Normal</AdjacentButton>
      <AdjacentButton {{style fontSize="120%"}}>120% Font Size</AdjacentButton>
      <AdjacentButton {{style fontSize="150%"}}>150% Font Size</AdjacentButton>
    `
  };
};

export const Builder = () => {
  return {
    template: hbs`
    <AdjacentButton {{invoke (fn this.invoke)}} as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Content>Adjacent Button</b.Content>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </AdjacentButton>

    <AdjacentButton disabled={{true}} as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Content>Disabled</b.Content>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </AdjacentButton>
    `,
    context: {
      invoke: action('button invoked')
    }
  };
};
