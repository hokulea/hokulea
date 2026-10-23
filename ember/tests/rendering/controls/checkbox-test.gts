import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { Checkbox } from '#src';
import { CheckboxPageObject } from '#test-support';

module('Rendering | Controls | <Checkbox>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><Checkbox /></template>);

    const input = new CheckboxPageObject();

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).isNotChecked();
    assert.dom(input.control).hasAttribute('type', 'checkbox');
  });

  test('html attributes work', async function (assert) {
    await render(<template><Checkbox name="form-name" /></template>);

    const input = new CheckboxPageObject();

    assert.dom(input.control).hasAttribute('name', 'form-name');
  });

  test('disabling the input', async function (assert) {
    await render(<template><Checkbox disabled /></template>);

    const input = new CheckboxPageObject();

    assert.dom(input.control).isDisabled();

    await render(<template><Checkbox @disabled={{true}} /></template>);

    assert.dom(input.control).isDisabled();
  });

  test('accepts value', async function (assert) {
    await render(<template><Checkbox @value={{true}} /></template>);

    const input = new CheckboxPageObject();

    assert.dom(input.control).isChecked();
  });

  test('triggers @update when changed', async function (assert) {
    const handleUpdate = sinon.spy();

    await render(<template><Checkbox @update={{handleUpdate}} /></template>);

    const input = new CheckboxPageObject();

    await click(input.control);

    assert.ok(handleUpdate.calledWith(true));

    await click(input.control);

    assert.ok(handleUpdate.calledWith(false));

    assert.strictEqual(handleUpdate.callCount, 2);
  });
});
