import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '@hokulea/ember';

import { FormPageObject } from '@hokulea/ember/test-support';

module('Rendering | <Form.Password>', function (hooks) {
  setupRenderingTest(hooks);

  const data = { password: '' };

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Password @label='Passwort' @description='Für den Login' @name='password' />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.strictEqual(form.$fields.length, 1);

    const field = form.$fields[0];
    const input = field.$control;

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'password');

    assert.dom(field.$label.element).hasTagName('label');
    assert.dom(field.$label.element).hasText('Passwort');
    assert.dom(field.$description.element).hasText('Für den Login');

    assert.strictEqual(field.$label.element?.getAttribute('for'), input.control.getAttribute('id'));
  });

  test('html attributes work', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Password @name='password' @label='Passwort' placeholder='abc' />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = form.$fields[0].$control;

    assert.dom(input.control).hasAttribute('placeholder', 'abc');
  });

  test('disabling the input', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Password @name='password' @label='Passwort' disabled />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = form.$fields[0].$control;

    assert.dom(input.control).isDisabled();

    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Password @name='password' @label='Passwort' @disabled={{true}} />
        </Form>
      </template>
    );

    assert.dom(input.control).isDisabled();
  });
});
