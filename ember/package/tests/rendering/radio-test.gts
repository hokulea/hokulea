import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { Radio } from '#src';
import { RadioPageObject } from '#test-support';

module('Rendering | <Radio>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><Radio /></template>);

    const input = new RadioPageObject();

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).isNotChecked();
    assert.dom(input.control).hasAttribute('type', 'radio');
  });

  test('html attributes work', async function (assert) {
    await render(<template><Radio name="form-name" /></template>);

    const input = new RadioPageObject();

    assert.dom(input.control).hasAttribute('name', 'form-name');
  });

  test('disabling the input', async function (assert) {
    await render(<template><Radio disabled /></template>);

    const input = new RadioPageObject();

    assert.dom(input.control).isDisabled();

    await render(<template><Radio @disabled={{true}} /></template>);

    assert.dom(input.control).isDisabled();
  });

  test('accepts value', async function (assert) {
    await render(<template><Radio @value={{true}} /></template>);

    const input = new RadioPageObject();

    assert.dom(input.control).isChecked();
  });

  test('triggers @update when checked', async function (assert) {
    const handleUpdate = sinon.spy();

    await render(<template><Radio @update={{handleUpdate}} /></template>);

    const input = new RadioPageObject();

    await click(input.control);

    assert.ok(handleUpdate.calledWith(true));

    await click(input.control);

    assert.strictEqual(handleUpdate.callCount, 1);
  });
});
