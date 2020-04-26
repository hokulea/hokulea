import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components|Buttons/Ghost'
};

export const basic = () => {
  return {
    template: hbs`
      <GhostButton {{invoke this.invoke}}>Ghost Button</GhostButton>
      <GhostButton disabled={{true}}>Disabled Ghost Button</GhostButton>
    `,
    context: {
      get invoke() {
        return action('button invoked');
      }
    }
  };
};

basic.story = {
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=123%3A9'
    }
  }
};

export const builder = () => {
  return {
    template: hbs`
    <GhostButton {{invoke this.invoke}} as |b|>
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
      get invoke() {
        return action('button invoked');
      }
    }
  };
};
