import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { fn, hash } from '@ember/helper';

import set from 'ember-set-helper/helpers/set';
import { TrackedArray } from 'tracked-built-ins';

import { Button, Checkbox, Form, List } from '@hokulea/ember';

function removeItem(items: unknown[], { position }: { position: number }) {
  items.splice(position, 1);
}

function appendItem(items: unknown[], { item }: { item: unknown }) {
  items.push(item);
}

const FRUITS = new TrackedArray(['Banana', 'Apple', 'Pear']);
const POKEMON = new TrackedArray(['Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu']);

export default class ListComposite extends Component {
  @tracked listMultiple = false;
  @tracked listItems = FRUITS;

  <template>
    <style>
      .with-controls { display: grid; grid-template-columns: auto 45%; gap: 1rem; } .controls
      {display: flex; flex-direction: column; gap: var(--spacing-container-2);} .inline-form {
      flex-direction: row; } .inline-form > :deep(div) { flex-direction: row; align-items: center; }
      .options { display: flex; flex-direction: row; align-items: center; gap:
      var(--spacing-primitive-2);}
    </style>
    <div class="with-controls">
      <List @multiple={{this.listMultiple}} as |l|>
        {{#each this.listItems as |i|}}
          <l.Option @value={{i}}>{{i}}</l.Option>
        {{/each}}
      </List>

      <div class="controls">
        <label>
          <Checkbox @value={{this.listMultiple}} @update={{set this "listMultiple"}} />
          Multi Select
        </label>

        <div class="options">
          <p>Set Items to:</p>
          <Button @push={{set this "listItems" FRUITS}} @spacing="-1">Fruits</Button>
          <Button @push={{set this "listItems" POKEMON}} @spacing="-1">Pokemon</Button>
        </div>

        {{! template-lint-disable no-unnecessary-curly-parens }}
        <Form
          @data={{hash item=""}}
          @submit={{(fn appendItem this.listItems)}}
          class="inline-form"
          as |f|
        >
          <f.Text @label="Item" @name="item" />
          <f.Submit @spacing="-1">+</f.Submit>
        </Form>

        <Form
          @data={{hash position=0}}
          @submit={{(fn removeItem this.listItems)}}
          class="inline-form"
          as |f|
        >
          <f.Text @label="Remove At" @name="position" />
          <f.Submit @spacing="-1">-</f.Submit>
        </Form>
      </div>
    </div>
  </template>
}
