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

export const Default = () => {
  return {
    template: hbs`
      <Select
        @options={{array "Banana" "Apple" "Pear"}}
        @value={{this.fruit}}
        @update={{this.updateFruit}}
      as |option|>
        {{option}}
      </Select>
      <TextInput/> this text is supposed to be next to the select
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <Select
        @options={{array "London" "New York" "Tokio"}}
        @value={{this.city}}
        @update={{this.updateCity}}
      as |option|>
        {{option}}
      </Select>
      <select></select>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <select>
        <option>foo</option>
        <option>bar</option>
      </select>
      <p>Some text under the select</p>
    `,
    context: {
      fruit: undefined,
      city: undefined,
      updateFruit: action(function (selection: string[]) {
        console.log('Select Story.updateFruit', selection, this);
        withAction('updateFruit')(selection);
        this.set('fruit', selection);
      }),
      updateCity: action(function (selection: string[]) {
        console.log('Select Story.updateCity', selection, this);
        withAction('updateCity')(selection);
        this.set('city', selection);
      })
    }
  };
};

Default.decorators = [withDesign];
Default.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Hokulea?node-id=575%3A9'
  }
};

export const Multiple = () => {
  return {
    template: hbs`
      <Select
        @multiple={{true}}
        @options={{array "Banana" "Apple" "Pear"}}
        @value={{this.selection}}
        @update={{this.update}}
      as |option|>
        {{option}}
      </Select> this text is supposed to be next to the select
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <select></select>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <select>
        <option>foo</option>
        <option>bar</option>
      </select>
      <p>Some text under the select</p>
    `,
    context: {
      selection: [],
      update: action(function (selection: string[]) {
        console.log('Select Story.update', selection, this);
        withAction('update')(selection);
        this.set('selection', selection);
      })
    }
  };
};
