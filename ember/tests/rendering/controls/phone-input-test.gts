import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { PhoneInput } from '#src';
import { PhoneInputPageObject } from '#test-support';

module('Rendering | Controls | <PhoneInput>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><PhoneInput /></template>);

    const input = new PhoneInputPageObject();

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'tel');
  });

  test('html attributes work', async function (assert) {
    await render(<template><PhoneInput placeholder="abc" /></template>);

    const input = new PhoneInputPageObject();

    assert.dom(input.control).hasAttribute('placeholder', 'abc');

    await render(<template><PhoneInput name="form-name" /></template>);

    assert.dom(input.control).hasAttribute('name', 'form-name');
  });

  test('disabling the input', async function (assert) {
    await render(<template><PhoneInput disabled /></template>);

    const input = new PhoneInputPageObject();

    assert.dom(input.control).isDisabled();

    await render(<template><PhoneInput @disabled={{true}} /></template>);

    assert.dom(input.control).isDisabled();
  });

  test('accepts value', async function (assert) {
    await render(<template><PhoneInput @value="Han Solo" /></template>);

    const input = new PhoneInputPageObject();

    assert.dom(input.control).hasValue('Han Solo');
  });

  test('triggers @update when value changes', async function (assert) {
    const handleUpdate = sinon.spy();

    await render(<template><PhoneInput @value="Han Solo" @update={{handleUpdate}} /></template>);

    const input = new PhoneInputPageObject();

    await fillIn(input.control, 'Obi Wan Kenobi');

    assert.ok(handleUpdate.calledWith('Obi Wan Kenobi'));
  });
});
