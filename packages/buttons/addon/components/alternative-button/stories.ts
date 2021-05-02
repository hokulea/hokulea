import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

import { makeButtonArgTypes } from '../stories-helper';

export default {
  title: 'Components/Buttons/Alternative',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = args => ({
  template: hbs`
    <AlternativeButton {{on "click" (fn this.invoke)}} {{style fontSize=this.size}}>{{this.label}}</AlternativeButton>
    <AlternativeButton disabled={{true}} {{style fontSize=this.size}}>Disabled {{this.label}}</AlternativeButton>
  `,
  context: {
    label: args.label,
    size: `var(--s${args.size})`,
    invoke: action('button invoked')
  }
});

Default.argTypes = makeButtonArgTypes({ label: 'Alternative Button' });

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

export const Reduced = args => ({
  template: hbs`
    <AlternativeReducedButton {{on "click" (fn this.invoke)}} {{style fontSize=this.size}}>{{this.label}}</AlternativeReducedButton>
    <AlternativeReducedButton disabled={{true}} {{style fontSize=this.size}}>Disabled {{this.label}}</AlternativeReducedButton>
  `,
  context: {
    label: args.label,
    size: `var(--s${args.size})`,
    invoke: action('button invoked')
  }
});

Reduced.argTypes = makeButtonArgTypes({ label: 'Alternative Reduced Button' });

export const Plain = args => ({
  template: hbs`
    <AlternativePlainButton {{on "click" (fn this.invoke)}} {{style fontSize=this.size}}>{{this.label}}</AlternativePlainButton>
    <AlternativePlainButton disabled={{true}} {{style fontSize=this.size}}>Disabled {{this.label}}</AlternativePlainButton>
  `,
  context: {
    label: args.label,
    size: `var(--s${args.size})`,
    invoke: action('button invoked')
  }
});

Plain.argTypes = makeButtonArgTypes({ label: 'Alternative Plain Button' });

export const Accessibility = () => ({
  template: hbs`
      <AlternativeButton aria-label="Go Tomster!">
        <span aria-hidden="true">🐹</span>
      </AlternativeButton>
    `
});

Accessibility.story = {
  name: 'A11y'
};

export const Sizing = () => ({
  template: hbs`
      <AlternativeButton {{style fontSize="var(--s-1)"}}>Font Size: --s-1</AlternativeButton>
      <AlternativeButton>Normal</AlternativeButton>
      <AlternativeButton {{style fontSize="var(--s1)"}}>Font Size: --s1</AlternativeButton>
      <AlternativeButton {{style fontSize="var(--s2)"}}>Font Size: --s2</AlternativeButton>
    `
});

export const Builder = () => ({
  template: hbs`
    <AlternativeButton {{on "click" (fn this.invoke)}} as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Content>Adjacent Button</b.Content>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </AlternativeButton>

    <AlternativeButton disabled={{true}} as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Content>Disabled</b.Content>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </AlternativeButton>
    `,
  context: {
    invoke: action('button invoked')
  }
});
