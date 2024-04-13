import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '@hokulea/ember';

import { FormPageObject } from '@hokulea/ember/test-support';

module('Rendering | <Form.Text>', function (hooks) {
  setupRenderingTest(hooks);

  const data = { givenName: '' };

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Text @label='Vorname' @description='Wie heißt du?' @name='givenName' />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.strictEqual(form.$fields.length, 1);

    const field = form.$fields[0];
    const input = field.$control;

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'text');

    assert.dom(field.$label.element).hasTagName('label');
    assert.dom(field.$label.element).hasText('Vorname');
    assert.dom(field.$description.element).hasText('Wie heißt du?');

    assert.strictEqual(field.$label.element?.getAttribute('for'), input.control.getAttribute('id'));
  });

  test('html attributes work', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Text @name='givenName' @label='Vorname' placeholder='abc' />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = form.$fields[0].$control;

    assert.dom(input.control).hasAttribute('placeholder', 'abc');
  });

  test('disabling the field', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Text @name='givenName' @label='Vorname' disabled />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = form.$fields[0].$control;

    assert.dom(input.control).isDisabled();

    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Text @name='givenName' @label='Vorname' @disabled={{true}} />
        </Form>
      </template>
    );

    assert.dom(input.control).isDisabled();
  });
});
