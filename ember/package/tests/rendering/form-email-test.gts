import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '#src';
import { FormPageObject } from '#test-support';

import type { FieldPageObject } from '#test-support/page-objects/-private/field.ts';

module('Rendering | <Form.Email>', function (hooks) {
  setupRenderingTest(hooks);

  const data = { email: '' };

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Email @label="Email" @description="Primärer Kontakt" @name="email" />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.strictEqual(form.$fields.length, 1);

    const field = form.$fields[0] as unknown as FieldPageObject;
    const input = field.$control;

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'email');

    assert.dom(field.$label).hasTagName('label');
    assert.dom(field.$label).hasText('Email');
    assert.dom(field.$description).hasText('Primärer Kontakt');

    assert.dom(field.$label).hasAttribute('for', input.control.getAttribute('id') as string);
  });

  test('html attributes work', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Email @name="email" @label="Email" placeholder="abc" />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = (form.$fields[0] as unknown as FieldPageObject).$control;

    assert.dom(input.control).hasAttribute('placeholder', 'abc');
  });

  test('disabling the input', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Email @name="email" @label="Email" disabled />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = (form.$fields[0] as unknown as FieldPageObject).$control;

    assert.dom(input.control).isDisabled();

    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Email @name="email" @label="Email" @disabled={{true}} />
        </Form>
      </template>
    );

    assert.dom(input.control).isDisabled();
  });
});
