import { array } from '@ember/helper';
import { render, select } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { Select } from '@hokulea/ember';

import { SelectPageObject } from '@hokulea/ember/test-support';

module('Rendering | <Select>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><Select /></template>);

    const input = new SelectPageObject();

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
  });

  test('html attributes work', async function (assert) {
    await render(<template><Select name="form-name" /></template>);

    const input = new SelectPageObject();

    assert.dom(input.control).hasAttribute('name', 'form-name');
  });

  test('disabling the input', async function (assert) {
    await render(<template><Select disabled /></template>);

    const input = new SelectPageObject();

    assert.dom(input.control).isDisabled();

    await render(<template><Select @disabled={{true}} /></template>);

    assert.dom(input.control).isDisabled();
  });

  module('Primitive Options', function () {
    test('renders options', async function (assert) {
      await render(
        <template>
          <Select as |s|>
            {{#each (array "Banana" "Apple" "Pear") as |item|}}
              <s.Option @value={{item}} />
            {{/each}}
          </Select>
        </template>
      );

      const input = new SelectPageObject();

      assert.dom(input.$option[0]).hasText('Banana');
      assert.dom(input.$option[1]).hasText('Apple');
      assert.dom(input.$option[2]).hasText('Pear');
    });

    test('renders selection', async function (assert) {
      await render(
        <template>
          <Select @value="Apple" as |s|>
            {{#each (array "Banana" "Apple" "Pear") as |item|}}
              <s.Option @value={{item}} />
            {{/each}}
          </Select>
        </template>
      );

      const input = new SelectPageObject();

      assert.dom(input.$option[1]).hasProperty('selected', true);
    });

    test('triggers @update', async function (assert) {
      const handleUpdate = sinon.spy();

      await render(
        <template>
          <Select @update={{handleUpdate}} as |s|>
            {{#each (array "Banana" "Apple" "Pear") as |item|}}
              <s.Option @value={{item}} />
            {{/each}}
          </Select>
        </template>
      );

      const input = new SelectPageObject();

      await select(input, 'Apple');

      assert.ok(handleUpdate.calledWith('Apple'));
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
          <Select as |s|>
            {{#each items as |item|}}
              <s.Option @value={{item.id}}>{{item.name}}</s.Option>
            {{/each}}
          </Select>
        </template>
      );

      const input = new SelectPageObject();

      assert.dom(input.$option[0]).hasText('Banana');
      assert.dom(input.$option[1]).hasText('Apple');
      assert.dom(input.$option[2]).hasText('Pear');
    });

    test('renders selection', async function (assert) {
      const selection = items[1];

      await render(
        <template>
          <Select @value={{selection.id}} as |s|>
            {{#each items as |item|}}
              <s.Option @value={{item.id}}>{{item.name}}</s.Option>
            {{/each}}
          </Select>
        </template>
      );

      const input = new SelectPageObject();

      assert.dom(input.$option[1]).hasProperty('selected', true);
    });

    test('triggers @update', async function (assert) {
      const handleUpdate = sinon.spy();

      await render(
        <template>
          <Select @update={{handleUpdate}} as |s|>
            {{#each items as |item|}}
              <s.Option @value={{item.id}}>{{item.name}}</s.Option>
            {{/each}}
          </Select>
        </template>
      );

      const input = new SelectPageObject();

      await select(input, `${items[1]?.id}`);

      assert.ok(handleUpdate.calledWith(`${items[1]?.id}`));
    });
  });
});
