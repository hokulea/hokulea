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

export const Default = args => ({
  template: hbs`
    <AdjacentButton {{on "click" (fn this.invoke)}} {{style fontSize=this.size}}>{{this.label}}</AdjacentButton>
    <AdjacentButton disabled={{true}} {{style fontSize=this.size}}>Disabled {{this.label}}</AdjacentButton>
  `,
  context: {
    label: args.label,
    size: `var(--s${args.size})`,
    invoke: action('button invoked')
  }
});

Default.argTypes = {
  label: {
    control: { type: 'text' }
  },
  size: {
    control: { type: 'range', min: -4, max: 4, step: 1 }
  }
};

Default.args = {
  label: 'Adjacent Button',
  size: 1
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

export const Accessibility = () => ({
  template: hbs`
      <AdjacentButton aria-label="Go Tomster!">
        <span aria-hidden="true">🐹</span>
      </AdjacentButton>
    `
});

Accessibility.story = {
  name: 'A11y'
};

export const Sizing = () => ({
  template: hbs`
      <AdjacentButton {{style fontSize="80%"}}>80% Font Size</AdjacentButton>
      <AdjacentButton>Normal</AdjacentButton>
      <AdjacentButton {{style fontSize="120%"}}>120% Font Size</AdjacentButton>
      <AdjacentButton {{style fontSize="150%"}}>150% Font Size</AdjacentButton>
    `
});

export const Builder = () => ({
  template: hbs`
    <AdjacentButton {{on "click" (fn this.invoke)}} as |b|>
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
});
