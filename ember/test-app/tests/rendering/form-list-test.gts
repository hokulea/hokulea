import { array } from '@ember/helper';
import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '@hokulea/ember';

import { FormPageObject } from '@hokulea/ember/test-support';

import type { ListPageObject } from '@hokulea/ember/test-support';

module('Rendering | <Form.List>', function (hooks) {
  setupRenderingTest(hooks);

  type Pokemon = { id: number; name: string };

  const data: { starterPokemon: string | Pokemon } = { starterPokemon: '' };

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.List @label='Your Starter Pokemon?' @description='Gen 1' @name='starterPokemon' />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.strictEqual(form.$fields.length, 1);

    const field = form.$fields[0];
    const input = field.$control;

    assert.dom(input.control).exists();
    assert.dom(input.control).doesNotHaveAria('disabled');

    assert.dom(field.$label.element).hasTagName('span');
    assert.dom(field.$label.element).hasText('Your Starter Pokemon?');
    assert.dom(field.$description.element).hasText('Gen 1');

    assert.strictEqual(field.$label.element?.getAttribute('for'), input.control.getAttribute('id'));
  });

  test('html attributes work', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.List @name='starterPokemon' @label='Your Starter Pokemon?' placeholder='abc' />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = form.$fields[0].$control.element;

    assert.dom(input).hasAttribute('placeholder', 'abc');
  });

  test('disabling the input', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.List @name='starterPokemon' @label='Your Starter Pokemon?' @disabled={{true}} />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = form.$fields[0].$control.element;

    assert.dom(input).hasAria('disabled', 'true');
  });

  module('Primitive items', function () {
    test('renders items', async function (assert) {
      await render(
        <template>
          <Form @data={{data}} as |f|>
            <f.List @name='starterPokemon' @label='Your Starter Pokemon?' as |l|>
              {{#each (array 'Bulbasaur' 'Charmander' 'Squirtle') as |item|}}
                <l.Option @value={{item}}>{{item}}</l.Option>
              {{/each}}
            </f.List>
          </Form>
        </template>
      );

      const form = new FormPageObject();
      const input = form.$fields[0].$control as ListPageObject;

      assert.dom(input.$option.elements[0]).hasText('Bulbasaur');
      assert.dom(input.$option.elements[1]).hasText('Charmander');
      assert.dom(input.$option.elements[2]).hasText('Squirtle');
    });

    test('renders selection', async function (assert) {
      const pokemonData = { starterPokemon: 'Charmander' };

      await render(
        <template>
          <Form @data={{pokemonData}} as |f|>
            <f.List @name='starterPokemon' @label='Your Starter Pokemon?' as |l|>
              {{#each (array 'Bulbasaur' 'Charmander' 'Squirtle') as |item|}}
                <l.Option @value={{item}}>{{item}}</l.Option>
              {{/each}}
            </f.List>
          </Form>
        </template>
      );

      const form = new FormPageObject();
      const input = form.$fields[0].$control as ListPageObject;

      assert.dom(input.$option.elements[1]).hasAria('selected', 'true');
    });
  });

  module('Complex Items', function () {
    const items: Pokemon[] = [
      {
        id: 1,
        name: 'Bulbasaur'
      },
      {
        id: 4,
        name: 'Charmander'
      },
      {
        id: 7,
        name: 'Squirtle'
      }
    ];

    test('renders items', async function (assert) {
      await render(
        <template>
          <Form @data={{data}} as |f|>
            <f.List @name='starterPokemon' @label='Your Starter Pokemon?' as |l|>
              {{#each items as |item|}}
                <l.Option @value={{item}}>{{item.name}}</l.Option>
              {{/each}}
            </f.List>
          </Form>
        </template>
      );

      const form = new FormPageObject();
      const input = form.$fields[0].$control as ListPageObject;

      assert.dom(input.$option.elements[0]).hasText('Bulbasaur');
      assert.dom(input.$option.elements[1]).hasText('Charmander');
      assert.dom(input.$option.elements[2]).hasText('Squirtle');
    });

    test('renders selection', async function (assert) {
      const pokemonData = { starterPokemon: items[1] };

      await render(
        <template>
          <Form @data={{pokemonData}} as |f|>
            <f.List @name='starterPokemon' @label='Your Starter Pokemon?' as |l|>
              {{#each items as |item|}}
                <l.Option @value={{item}}>{{item.name}}</l.Option>
              {{/each}}
            </f.List>
          </Form>
        </template>
      );

      const form = new FormPageObject();
      const input = form.$fields[0].$control as ListPageObject;

      assert.dom(input.$option.elements[1]).hasAria('selected', 'true');
    });
  });
});
