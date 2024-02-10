import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { EmailInput } from '@hokulea/ember';

import { EmailInputPageObject } from '@hokulea/ember/test-support';

module('Rendering | <EmailInput>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><EmailInput /></template>);

    const input = new EmailInputPageObject();

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'email');
  });

  test('html attributes work', async function (assert) {
    await render(<template><EmailInput placeholder='abc' /></template>);

    const input = new EmailInputPageObject();

    assert.dom(input.control).hasAttribute('placeholder', 'abc');

    await render(<template><EmailInput name='form-name' /></template>);

    assert.dom(input.control).hasAttribute('name', 'form-name');
  });

  test('disabling the input', async function (assert) {
    await render(<template><EmailInput disabled /></template>);

    const input = new EmailInputPageObject();

    assert.dom(input.control).isDisabled();

    await render(<template><EmailInput @disabled={{true}} /></template>);

    assert.dom(input.control).isDisabled();
  });

  test('accepts value', async function (assert) {
    await render(<template><EmailInput @value='han.solo@smuglers-of-the.galaxy' /></template>);

    const input = new EmailInputPageObject();

    assert.dom(input.control).hasValue('han.solo@smuglers-of-the.galaxy');
  });

  test('triggers @update when value changes', async function (assert) {
    const handleUpdate = sinon.spy();

    await render(<template>
      <EmailInput @value='han.solo@smuglers-of-the.galaxy' @update={{handleUpdate}} />
    </template>);

    const input = new EmailInputPageObject();

    await fillIn(input.control, 'obi-wan.kenobi@jedi-order.galaxy');

    assert.ok(handleUpdate.calledWith('obi-wan.kenobi@jedi-order.galaxy'));
  });
});
