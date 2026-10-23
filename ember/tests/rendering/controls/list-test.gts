import { array } from '@ember/helper';
import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { List } from '#src';
import { ListPageObject } from '#test-support';

module('Rendering | Controls | <List>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><List /></template>);

    const input = new ListPageObject();

    assert.dom(input.control).exists();
    assert.dom(input.control).doesNotHaveAria('disabled');
  });

  test('html attributes work', async function (assert) {
    await render(<template><List part="form-name" /></template>);

    const input = new ListPageObject();

    assert.dom(input.control).hasAttribute('part', 'form-name');
  });

  test('disabling the input', async function (assert) {
    await render(<template><List @disabled={{true}} /></template>);

    const input = new ListPageObject();

    assert.dom(input.control).hasAria('disabled', 'true');
  });

  module('Primitive Options', function () {
    test('renders options', async function (assert) {
      await render(
        <template>
          <List as |l|>
            {{#each (array "Banana" "Apple" "Pear") as |item|}}
              <l.Option @value={{item}}>{{item}}</l.Option>
            {{/each}}
          </List>
        </template>
      );

      const input = new ListPageObject();

      assert.dom(input.$option[0]).hasText('Banana');
      assert.dom(input.$option[1]).hasText('Apple');
      assert.dom(input.$option[2]).hasText('Pear');
    });

    test('renders selection', async function (assert) {
      await render(
        <template>
          <List @value="Apple" as |l|>
            {{#each (array "Banana" "Apple" "Pear") as |item|}}
              <l.Option @value={{item}}>{{item}}</l.Option>
            {{/each}}
          </List>
        </template>
      );

      const input = new ListPageObject();

      assert.dom(input.$option[1]).hasAria('selected', 'true');
    });

    test('triggers @update', async function (assert) {
      const handleUpdate = sinon.spy();

      await render(
        <template>
          <List @update={{handleUpdate}} as |l|>
            {{#each (array "Banana" "Apple" "Pear") as |item|}}
              <l.Option @value={{item}}>{{item}}</l.Option>
            {{/each}}
          </List>
        </template>
      );

      const input = new ListPageObject();

      await input.select('Apple');

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
          <List as |s|>
            {{#each items as |item|}}
              <s.Option @value={{item.id}}>{{item.name}}</s.Option>
            {{/each}}
          </List>
        </template>
      );

      const input = new ListPageObject();

      assert.dom(input.$option[0]).hasText('Banana');
      assert.dom(input.$option[1]).hasText('Apple');
      assert.dom(input.$option[2]).hasText('Pear');
    });

    test('renders selection', async function (assert) {
      const selection = items[1];

      await render(
        <template>
          <List @value={{selection.id}} as |s|>
            {{#each items as |item|}}
              <s.Option @value={{item.id}}>{{item.name}}</s.Option>
            {{/each}}
          </List>
        </template>
      );

      const input = new ListPageObject();

      assert.dom(input.$option[1]).hasAria('selected', 'true');
    });

    test('triggers @update', async function (assert) {
      const handleUpdate = sinon.spy();

      await render(
        <template>
          <List @update={{handleUpdate}} as |s|>
            {{#each items as |item|}}
              <s.Option @value={{item}}>{{item.name}}</s.Option>
            {{/each}}
          </List>
        </template>
      );

      const input = new ListPageObject();

      await input.select(items[1]?.name as string);

      assert.ok(handleUpdate.calledWith(items[1]));
    });
  });
});
