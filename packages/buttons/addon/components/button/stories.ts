import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

import { makeButtonArgTypes } from '../stories-helper';

export default {
  title: 'Components/Buttons/Button',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = args => ({
  template: hbs`
    <Button {{on "click" (fn this.invoke)}} {{style fontSize=this.size}}>{{this.label}}</Button>
    <Button disabled={{true}} {{style fontSize=this.size}}>Disabled {{this.label}}</Button>
  `,
  context: {
    label: args.label,
    size: `var(--s${args.size})`,
    invoke: action('button invoked')
  }
});

Default.argTypes = makeButtonArgTypes({ label: 'Button' });

Default.story = {
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=106%3A9'
    }
  }
};

export const Reduced = args => ({
  template: hbs`
    <ReducedButton {{on "click" (fn this.invoke)}} {{style fontSize=this.size}}>{{this.label}}</ReducedButton>
    <ReducedButton disabled={{true}} {{style fontSize=this.size}}>Disabled {{this.label}}</ReducedButton>
  `,
  context: {
    label: args.label,
    size: `var(--s${args.size})`,
    invoke: action('button invoked')
  }
});

Reduced.argTypes = makeButtonArgTypes({ label: 'Reduced Button' });

export const Plain = args => ({
  template: hbs`
    <PlainButton {{on "click" (fn this.invoke)}} {{style fontSize=this.size}}>{{this.label}}</PlainButton>
    <PlainButton disabled={{true}} {{style fontSize=this.size}}>Disabled {{this.label}}</PlainButton>
  `,
  context: {
    label: args.label,
    size: `var(--s${args.size})`,
    invoke: action('button invoked')
  }
});

Plain.argTypes = makeButtonArgTypes({ label: 'Plain Button' });

export const Accessibility = () => ({
  template: hbs`
      <Button aria-label="Go Tomster!">
        <span aria-hidden="true">🐹</span>
      </Button>
    `
});

Accessibility.story = {
  name: 'A11y'
};

export const Sizing = () => ({
  template: hbs`
      <Button {{style fontSize="var(--s-1)"}}>Font Size: --s-1</Button>
      <Button>Normal</Button>
      <Button {{style fontSize="var(--s1)"}}>Font Size: --s1</Button>
      <Button {{style fontSize="var(--s2)"}}>Font Size: --s2</Button>
    `
});

export const Builder = () => ({
  template: hbs`
    <Button {{on "click" (fn this.invoke)}} as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Content>Button</b.Content>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </Button>

    <Button disabled={{true}} as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Content>Disabled</b.Content>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </Button>
    `,
  context: {
    invoke: action('button invoked')
  }
});
