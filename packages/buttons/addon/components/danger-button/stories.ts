import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components|Buttons/Danger'
};

export const Default = () => {
  return {
    template: hbs`
      <DangerButton {{invoke (fn this.invoke)}}>Danger Button</DangerButton>
      <DangerButton disabled={{true}}>Disabled Danger Button</DangerButton>
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
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=404%3A251'
    }
  }
};

export const Sizing = () => {
  return {
    template: hbs`
      <DangerButton {{style fontSize="80%"}}>80% Font Size</DangerButton>
      <DangerButton>Normal</DangerButton>
      <DangerButton {{style fontSize="120%"}}>120% Font Size</DangerButton>
      <DangerButton {{style fontSize="150%"}}>150% Font Size</DangerButton>
    `
  };
};

export const Builder = () => {
  return {
    template: hbs`
    <DangerButton {{invoke (fn this.invoke)}} as |b|>
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
  };
};
