import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { PasswordInput } from '#src';
import { PasswordInputPageObject } from '#test-support';

module('Rendering | <PasswordInput>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><PasswordInput /></template>);

    const input = new PasswordInputPageObject();

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'password');
  });

  test('html attributes work', async function (assert) {
    await render(<template><PasswordInput placeholder="abc" /></template>);

    const input = new PasswordInputPageObject();

    assert.dom(input.control).hasAttribute('placeholder', 'abc');

    await render(<template><PasswordInput name="form-name" /></template>);

    assert.dom(input.control).hasAttribute('name', 'form-name');
  });

  test('disabling the input', async function (assert) {
    await render(<template><PasswordInput disabled /></template>);

    const input = new PasswordInputPageObject();

    assert.dom(input.control).isDisabled();

    await render(<template><PasswordInput @disabled={{true}} /></template>);

    assert.dom(input.control).isDisabled();
  });

  test('accepts value', async function (assert) {
    await render(<template><PasswordInput @value="Han Solo" /></template>);

    const input = new PasswordInputPageObject();

    assert.dom(input.control).hasValue('Han Solo');
  });

  test('triggers @update when value changes', async function (assert) {
    const handleUpdate = sinon.spy();

    await render(<template><PasswordInput @value="Han Solo" @update={{handleUpdate}} /></template>);

    const input = new PasswordInputPageObject();

    await fillIn(input.control, 'Obi Wan Kenobi');

    assert.ok(handleUpdate.calledWith('Obi Wan Kenobi'));
  });
});
