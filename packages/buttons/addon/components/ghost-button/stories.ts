import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Buttons/Ghost',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = () => ({
  template: hbs`
      <GhostButton {{on "click" (fn this.invoke)}}>Ghost Button</GhostButton>
      <GhostButton disabled={{true}}>Disabled Ghost Button</GhostButton>
    `,
  context: {
    invoke: action('button invoked')
  }
});

Default.story = {
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=123%3A9'
    }
  }
};

export const Accessibility = () => ({
  template: hbs`
      <GhostButton aria-label="Go Tomster!">
        <span aria-hidden="true">🐹</span>
      </GhostButton>
    `
});

Accessibility.story = {
  name: 'A11y'
};

export const Sizing = () => ({
  template: hbs`
      <GhostButton {{style fontSize="80%"}}>80% Font Size</GhostButton>
      <GhostButton>Normal</GhostButton>
      <GhostButton {{style fontSize="120%"}}>120% Font Size</GhostButton>
      <GhostButton {{style fontSize="150%"}}>150% Font Size</GhostButton>
    `
});

export const Builder = () => ({
  template: hbs`
    <GhostButton {{on "click" (fn this.invoke)}} as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Content>Button</b.Content>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </GhostButton>

    <GhostButton disabled={{true}} as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Content>Disabled</b.Content>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </GhostButton>
    `,
  context: {
    invoke: action('button invoked')
  }
});
