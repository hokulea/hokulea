import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Buttons/Button',
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
      <Button {{on "click" (fn this.invoke)}}>Button</Button>
      <Button disabled={{true}}>Disabled Button</Button>
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
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=106%3A9'
    }
  }
};

export const Accessibility = () => {
  return {
    template: hbs`
      <Button aria-label="Go Tomster!">
        <span aria-hidden="true">🐹</span>
      </Button>
    `
  };
};

Accessibility.story = {
  name: 'A11y'
};

export const Sizing = () => {
  return {
    template: hbs`
      <Button {{style fontSize="80%"}}>80% Font Size</Button>
      <Button>Normal</Button>
      <Button {{style fontSize="120%"}}>120% Font Size</Button>
      <Button {{style fontSize="150%"}}>150% Font Size</Button>
    `
  };
};

export const Builder = () => {
  return {
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
  };
};
