import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { CurrencyInput } from '#src';

import { CurrencyInputPageObject } from '#test-support' ;

module('Rendering | <CurrencyInput>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><CurrencyInput /></template>);

    const input = new CurrencyInputPageObject();

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'text');
    assert.dom(input.control).hasAttribute('inputmode', 'decimal');

    assert.dom(input.$affix.element).hasText('€');
  });

  test('html attributes work', async function (assert) {
    await render(<template><CurrencyInput placeholder="abc" /></template>);

    const input = new CurrencyInputPageObject();

    assert.dom(input.control).hasAttribute('placeholder', 'abc');

    await render(<template><CurrencyInput name="form-name" /></template>);

    assert.dom(input.control).hasAttribute('name', 'form-name');
  });

  test('disabling the input', async function (assert) {
    await render(<template><CurrencyInput disabled /></template>);

    const input = new CurrencyInputPageObject();

    assert.dom(input.control).isDisabled();

    await render(<template><CurrencyInput @disabled={{true}} /></template>);

    assert.dom(input.control).isDisabled();
  });

  test('accepts value', async function (assert) {
    await render(<template><CurrencyInput @value={{1234.45}} /></template>);

    const input = new CurrencyInputPageObject();

    assert.dom(input.control).hasValue('1234.45');
  });

  test('triggers @update when value changes', async function (assert) {
    const handleUpdate = sinon.spy();

    await render(<template><CurrencyInput @value={{1234}} @update={{handleUpdate}} /></template>);

    const input = new CurrencyInputPageObject();

    await fillIn(input.control, '5678.91');

    assert.ok(handleUpdate.calledWith(5678.91));
  });
});
