import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { TextInput } from '#src';
import { TextInputPageObject } from '#test-support';

module('Rendering | Controls | <TextInput>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><TextInput /></template>);

    const input = new TextInputPageObject();

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'text');
  });

  test('html attributes work', async function (assert) {
    await render(<template><TextInput placeholder="abc" /></template>);

    const input = new TextInputPageObject();

    assert.dom(input.control).hasAttribute('placeholder', 'abc');

    await render(<template><TextInput name="form-name" /></template>);

    assert.dom(input.control).hasAttribute('name', 'form-name');
  });

  test('disabling the input', async function (assert) {
    await render(<template><TextInput disabled /></template>);

    const input = new TextInputPageObject();

    assert.dom(input.control).isDisabled();

    await render(<template><TextInput @disabled={{true}} /></template>);

    assert.dom(input.control).isDisabled();
  });

  test('accepts value', async function (assert) {
    await render(<template><TextInput @value="Han Solo" /></template>);

    const input = new TextInputPageObject();

    assert.dom(input.control).hasValue('Han Solo');
  });

  test('triggers @update when value changes', async function (assert) {
    const handleUpdate = sinon.spy();

    await render(<template><TextInput @value="Han Solo" @update={{handleUpdate}} /></template>);

    const input = new TextInputPageObject();

    await fillIn(input.control, 'Obi Wan Kenobi');

    assert.ok(handleUpdate.calledWith('Obi Wan Kenobi'));
  });
});
