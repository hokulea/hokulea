import { array } from '@ember/helper';
import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '@hokulea/ember';

import { FormPageObject } from '@hokulea/ember/test-support';

import type { SelectPageObject } from '@hokulea/ember/test-support';

module('Rendering | <Form.Select>', function (hooks) {
  setupRenderingTest(hooks);

  const data = { favoriteFruit: '' };

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Select
            @label='Deine Lieblingsfrucht?'
            @description='Aus dem Obstkorb'
            @name='favoriteFruit'
          />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.strictEqual(form.$fields.length, 1);

    const field = form.$fields[0];
    const input = field.$control;

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasTagName('select');

    assert.dom(field.$label).hasTagName('label');
    assert.dom(field.$label).hasText('Deine Lieblingsfrucht?');
    assert.dom(field.$description).hasText('Aus dem Obstkorb');

    assert.dom(field.$label).hasAttribute('for', input.control.getAttribute('id') as string);
  });

  test('html attributes work', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Select @name='favoriteFruit' @label='Deine Lieblingsfrucht?' placeholder='abc' />
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
          <f.Select @name='favoriteFruit' @label='Deine Lieblingsfrucht?' disabled />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = form.$fields[0].$control.element;

    assert.dom(input).isDisabled();

    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Select @name='favoriteFruit' @label='Deine Lieblingsfrucht?' @disabled={{true}} />
        </Form>
      </template>
    );

    assert.dom(input).isDisabled();
  });

  module('Primitive items', function () {
    test('renders items', async function (assert) {
      await render(
        <template>
          <Form @data={{data}} as |f|>
            <f.Select @name='favoriteFruit' @label='Deine Lieblingsfrucht?' as |s|>
              {{#each (array 'Banana' 'Apple' 'Pear') as |item|}}
                <s.Option @value={{item}} />
              {{/each}}
            </f.Select>
          </Form>
        </template>
      );

      const form = new FormPageObject();
      const input = form.$fields[0].$control as SelectPageObject;

      assert.dom(input.$option.elements[0]).hasText('Banana');
      assert.dom(input.$option.elements[1]).hasText('Apple');
      assert.dom(input.$option.elements[2]).hasText('Pear');
    });

    test('renders selection', async function (assert) {
      const fruitData = { favoriteFruit: 'Apple' };

      await render(
        <template>
          <Form @data={{fruitData}} as |f|>
            <f.Select @name='favoriteFruit' @label='Deine Lieblingsfrucht?' as |s|>
              {{#each (array 'Banana' 'Apple' 'Pear') as |item|}}
                <s.Option @value={{item}} />
              {{/each}}
            </f.Select>
          </Form>
        </template>
      );

      const form = new FormPageObject();
      const input = form.$fields[0].$control as SelectPageObject;

      assert.dom(input.$option.elements[1]).hasProperty('selected', true);
    });
  });

  module('Complex Items', function () {
    type Fruit = { id: number; name: string };

    const items: Fruit[] = [
      {
        id: 1234,
        name: 'Banana'
      },
      {
        id: 46,
        name: 'Apple'
      },
      {
        id: 98,
        name: 'Pear'
      }
    ];

    test('renders items', async function (assert) {
      await render(
        <template>
          <Form @data={{data}} as |f|>
            <f.Select @name='favoriteFruit' @label='Deine Lieblingsfrucht?' as |s|>
              {{#each items as |item|}}
                <s.Option @value={{item.id}}>{{item.name}}</s.Option>
              {{/each}}
            </f.Select>
          </Form>
        </template>
      );

      const form = new FormPageObject();
      const input = form.$fields[0].$control as SelectPageObject;

      assert.dom(input.$option.elements[0]).hasText('Banana');
      assert.dom(input.$option.elements[1]).hasText('Apple');
      assert.dom(input.$option.elements[2]).hasText('Pear');
    });

    test('renders selection', async function (assert) {
      const fruitData = { favoriteFruit: `${items[1].id}` };

      await render(
        <template>
          <Form @data={{fruitData}} as |f|>
            <f.Select @name='favoriteFruit' @label='Deine Lieblingsfrucht?' as |s|>
              {{#each items as |item|}}
                <s.Option @value={{item.id}}>{{item.name}}</s.Option>
              {{/each}}
            </f.Select>
          </Form>
        </template>
      );

      const form = new FormPageObject();
      const input = form.$fields[0].$control as SelectPageObject;

      assert.dom(input.$option.elements[1]).hasProperty('selected', true);
    });
  });
});
