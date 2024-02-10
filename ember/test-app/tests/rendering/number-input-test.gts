import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { NumberInput } from '@hokulea/ember';

import { NumberInputPageObject } from '@hokulea/ember/test-support';

module('Rendering | <NumberInput>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><NumberInput /></template>);

    const input = new NumberInputPageObject();

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'number');
  });

  test('html attributes work', async function (assert) {
    await render(<template><NumberInput placeholder='abc' /></template>);

    const input = new NumberInputPageObject();

    assert.dom(input.control).hasAttribute('placeholder', 'abc');

    await render(<template><NumberInput name='form-name' /></template>);

    assert.dom(input.control).hasAttribute('name', 'form-name');
  });

  test('disabling the input', async function (assert) {
    await render(<template><NumberInput disabled /></template>);

    const input = new NumberInputPageObject();

    assert.dom(input.control).isDisabled();

    await render(<template><NumberInput @disabled={{true}} /></template>);

    assert.dom(input.control).isDisabled();
  });

  test('accepts value', async function (assert) {
    await render(<template><NumberInput @value={{1234}} /></template>);

    const input = new NumberInputPageObject();

    assert.dom(input.control).hasValue('1234');
  });

  test('triggers @update when value changes', async function (assert) {
    const handleUpdate = sinon.spy();

    await render(<template><NumberInput @value={{1234}} @update={{handleUpdate}} /></template>);

    const input = new NumberInputPageObject();

    await fillIn(input.control, '5678');

    assert.ok(handleUpdate.calledWith(5678));
  });
});
