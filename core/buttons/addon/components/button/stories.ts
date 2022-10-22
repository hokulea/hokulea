import { hbs } from 'ember-cli-htmlbars';

import { Intent, Importance } from '@hokulea/foundation/tokens';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/api';
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

export const Default = args => ({
  template: hbs`
    <Button @intent={{this.intent}} @importance={{this.importance}} {{on "click" (fn this.invoke)}} {{style fontSize=this.size}}>{{this.label}}</Button>
    <Button @intent={{this.intent}} @importance={{this.importance}} disabled={{true}} {{style fontSize=this.size}}>Disabled {{this.label}}</Button>
  `,
  context: {
    intent: args.intent,
    importance: args.importance,
    label: args.label,
    size: `var(--s${args.size})`,
    invoke: action('button invoked')
  }
});

Default.argTypes = {
  intent: {
    name: 'Intent',
    defaultValue: Intent.Action,
    control: { type: 'radio', options: Object.values(Intent) }
  },
  importance: {
    name: 'Importance',
    defaultValue: Importance.Fill,
    control: { type: 'radio', options: Object.values(Importance) }
  },
  label: {
    name: 'Label',
    defaultValue: 'Button',
    control: { type: 'text' }
  },
  size: {
    name: 'Size',
    defaultValue: 0,
    control: { type: 'range', min: -2, max: 4 }
  }
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
