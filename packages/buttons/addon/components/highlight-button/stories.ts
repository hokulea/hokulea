import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

import { makeButtonArgTypes } from '../stories-helper';

export default {
  title: 'Components/Buttons/Highlight',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = args => ({
  template: hbs`
    <HighlightButton {{on "click" (fn this.invoke)}} {{style fontSize=this.size}}>{{this.label}}</HighlightButton>
    <HighlightButton disabled={{true}} {{style fontSize=this.size}}>Disabled {{this.label}}</HighlightButton>
  `,
  context: {
    label: args.label,
    size: `var(--s${args.size})`,
    invoke: action('button invoked')
  }
});

Default.argTypes = makeButtonArgTypes({ label: 'Highlight Button' });

Default.story = {
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=404%3A152'
    }
  }
};

export const Reduced = args => ({
  template: hbs`
    <HighlightReducedButton {{on "click" (fn this.invoke)}} {{style fontSize=this.size}}>{{this.label}}</HighlightReducedButton>
    <HighlightReducedButton disabled={{true}} {{style fontSize=this.size}}>Disabled {{this.label}}</HighlightReducedButton>
  `,
  context: {
    label: args.label,
    size: `var(--s${args.size})`,
    invoke: action('button invoked')
  }
});

Reduced.argTypes = makeButtonArgTypes({ label: 'Highlight Reduced Button' });

export const Plain = args => ({
  template: hbs`
    <HighlightPlainButton {{on "click" (fn this.invoke)}} {{style fontSize=this.size}}>{{this.label}}</HighlightPlainButton>
    <HighlightPlainButton disabled={{true}} {{style fontSize=this.size}}>Disabled {{this.label}}</HighlightPlainButton>
  `,
  context: {
    label: args.label,
    size: `var(--s${args.size})`,
    invoke: action('button invoked')
  }
});

Plain.argTypes = makeButtonArgTypes({ label: 'Highlight Plain Button' });

export const Accessibility = () => ({
  template: hbs`
      <HighlightButton aria-label="Go Tomster!">
        <span aria-hidden="true">🐹</span>
      </HighlightButton>
    `
});

Accessibility.story = {
  name: 'A11y'
};

export const Sizing = () => ({
  template: hbs`
      <HighlightButton {{style fontSize="var(--s-1)"}}>Font Size: --s-1</HighlightButton>
      <HighlightButton>Normal</HighlightButton>
      <HighlightButton {{style fontSize="var(--s1)"}}>Font Size: --s1</HighlightButton>
      <HighlightButton {{style fontSize="var(--s2)"}}>Font Size: --s2</HighlightButton>
    `
});

export const Builder = () => ({
  template: hbs`
    <HighlightButton {{on "click" (fn this.invoke)}} as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Content>Accent Button</b.Content>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </HighlightButton>

    <HighlightButton disabled={{true}} as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Content>Disabled</b.Content>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </HighlightButton>
    `,
  context: {
    invoke: action('button invoked')
  }
});
