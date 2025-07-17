import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '#src';

import { FormPageObject } from '#test-support' ;

import type { FieldPageObject } from '@hokulea/ember/test-support/page-objects/-private/field';

module('Rendering | <Form.Password>', function (hooks) {
  setupRenderingTest(hooks);

  const data = { password: '' };

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Password @label="Passwort" @description="Für den Login" @name="password" />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.strictEqual(form.$fields.length, 1);

    const field = form.$fields[0] as FieldPageObject;
    const input = field.$control;

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'password');

    assert.dom(field.$label).hasTagName('label');
    assert.dom(field.$label).hasText('Passwort');
    assert.dom(field.$description).hasText('Für den Login');

    assert.dom(field.$label).hasAttribute('for', input.control.getAttribute('id') as string);
  });

  test('html attributes work', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Password @name="password" @label="Passwort" placeholder="abc" />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = (form.$fields[0] as FieldPageObject).$control;

    assert.dom(input.control).hasAttribute('placeholder', 'abc');
  });

  test('disabling the input', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Password @name="password" @label="Passwort" disabled />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = (form.$fields[0] as FieldPageObject).$control;

    assert.dom(input.control).isDisabled();

    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Password @name="password" @label="Passwort" @disabled={{true}} />
        </Form>
      </template>
    );

    assert.dom(input.control).isDisabled();
  });
});
