/* eslint-disable max-classes-per-file */
import { action } from '@ember/object';

import { hbs } from 'ember-cli-htmlbars';

import { action as withAction } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Inputs/Select',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = () => ({
  template: hbs`
      <Select
        @options={{array "Banana" "Apple" "Pear"}}
        @value={{this.fruit}}
        @update={{this.updateFruit}}
      as |option|>
        {{option}}
      </Select>

      <Select
        @options={{array "London" "New York" "Tokio"}}
        @value={{this.city}}
        @update={{this.updateCity}}
      >
        <:placeholder>Please select city</:placeholder>
        <:selected as |value|>🏛 {{value}}</:selected>
        <:option as |option|>🏢 {{option}}</:option>
      </Select>
    `,
  context: {
    fruit: undefined,
    city: undefined,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    updateFruit: action(function (selection: string[]) {
      withAction('updateFruit')(selection);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      this.set('fruit', selection);
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    updateCity: action(function (selection: string[]) {
      withAction('updateCity')(selection);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      this.set('city', selection);
    })
  }
});

Default.decorators = [withDesign];
Default.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Hokulea?node-id=575%3A9'
  }
};

export const Multiple = () => ({
  template: hbs`
      <Select
        @multiple={{true}}
        @options={{array "Banana" "Apple" "Pear"}}
        @value={{this.fruites}}
        @update={{this.updateFruites}}
      as |option|>
        {{option}}
      </Select>

      <Select
        @multiple={{true}}
        @options={{array "London" "New York" "Tokio"}}
        @value={{this.cities}}
        @update={{this.updateCities}}
      >
        <:placeholder>Please select city</:placeholder>
        <:selected as |value|>🏛 {{value}}</:selected>
        <:option as |option|>🏢 {{option}}</:option>
      </Select>
    `,
  context: {
    fruites: [],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    updateFruites: action(function (selection: string[]) {
      withAction('updateFruit')(selection);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      this.set('fruites', selection);
    }),
    cities: [],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    updateCities: action(function (selection: string[]) {
      withAction('updateCity')(selection);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      this.set('cities', selection);
    })
  }
});

export const Showcase = () => ({
  template: hbs`
      <Select
        @options={{array "Banana" "Apple" "Pear"}}
        @value={{this.fruit}}
        @update={{this.updateFruit}}
      as |option|>
        {{option}}
      </Select> <TextInput/> this text is supposed to be next to the select
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <select></select>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <Select
        @multiple={{true}}
        @options={{array "London" "New York" "Tokio"}}
        @value={{this.cities}}
        @update={{this.updateCities}}
      >
        <:placeholder>Please select city</:placeholder>
        <:selected as |value|>🏛 {{value}}</:selected>
        <:option as |option|>🏢 {{option}}</:option>
      </Select>
      <select>
        <option>foo</option>
        <option>bar</option>
        <option>baz</option>
      </select>
      <p>Some text under the select</p>
    `,
  context: {
    fruit: undefined,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    updateFruit: action(function (selection: string[]) {
      withAction('updateFruit')(selection);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      this.set('fruit', selection);
    }),
    cities: [],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    updateCities: action(function (selection: string[]) {
      withAction('updateCities')(selection);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      this.set('cities', selection);
    })
  }
});
