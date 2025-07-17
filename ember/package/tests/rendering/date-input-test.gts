import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { DateInput } from '#src';
import { DateInputPageObject } from '#test-support';

module('Rendering | <DateInput>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><DateInput /></template>);

    const input = new DateInputPageObject();

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'date');
  });

  test('html attributes work', async function (assert) {
    await render(<template><DateInput placeholder="abc" /></template>);

    const input = new DateInputPageObject();

    assert.dom(input.control).hasAttribute('placeholder', 'abc');

    await render(<template><DateInput name="form-name" /></template>);

    assert.dom(input.control).hasAttribute('name', 'form-name');
  });

  test('disabling the input', async function (assert) {
    await render(<template><DateInput disabled /></template>);

    const input = new DateInputPageObject();

    assert.dom(input.control).isDisabled();

    await render(<template><DateInput @disabled={{true}} /></template>);

    assert.dom(input.control).isDisabled();
  });

  test('accepts value', async function (assert) {
    await render(<template><DateInput @value="1970-01-01" /></template>);

    const input = new DateInputPageObject();

    assert.dom(input.control).hasValue('1970-01-01');
  });

  test('triggers @update when value changes', async function (assert) {
    const handleUpdate = sinon.spy();

    await render(<template><DateInput @value="1970-01-01" @update={{handleUpdate}} /></template>);

    const input = new DateInputPageObject();

    await fillIn(input.control, '2000-10-20');

    assert.ok(handleUpdate.calledWith('2000-10-20'));
  });
});
