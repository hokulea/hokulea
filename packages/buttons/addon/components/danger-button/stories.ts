import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Buttons/Danger',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = args => ({
  template: hbs`
    <DangerButton {{on "click" (fn this.invoke)}} {{style fontSize=this.size}}>{{this.label}}</DangerButton>
    <DangerButton disabled={{true}} {{style fontSize=this.size}}>Disabled {{this.label}}</DangerButton>
  `,
  context: {
    label: args.label,
    size: `var(--s${args.size})`,
    invoke: action('button invoked')
  }
});

Default.argTypes = {
  label: {
    defaultValue: 'Danger Button',
    control: { type: 'text' }
  },
  size: {
    defaultValue: 1,
    control: { type: 'range', min: -4, max: 4, step: 1 }
  }
};

Default.story = {
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=404%3A251'
    }
  }
};

export const Accessibility = () => ({
  template: hbs`
      <DangerButton aria-label="Go Tomster!">
        <span aria-hidden="true">🐹</span>
      </DangerButton>
    `
});

Accessibility.story = {
  name: 'A11y'
};

export const Sizing = () => ({
  template: hbs`
      <DangerButton {{style fontSize="80%"}}>80% Font Size</DangerButton>
      <DangerButton>Normal</DangerButton>
      <DangerButton {{style fontSize="120%"}}>120% Font Size</DangerButton>
      <DangerButton {{style fontSize="150%"}}>150% Font Size</DangerButton>
    `
});

export const Builder = () => ({
  template: hbs`
    <DangerButton {{on "click" (fn this.invoke)}} as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Content>Danger Button</b.Content>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </DangerButton>

    <DangerButton disabled={{true}} as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Content>Disabled</b.Content>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </DangerButton>
    `,
  context: {
    invoke: action('button invoked')
  }
});
