import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import Sinon from 'sinon';

import { Form } from '#src';
import { FormPageObject } from '#test-support';

import type { FieldPageObject } from '@hokulea/ember/test-support/page-objects/-private/field';

module('Rendering | <Form.Date>', function (hooks) {
  setupRenderingTest(hooks);

  const data = { birthday: '' };

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Date @label="Geburtstag" @description="Wann bist du geboren?" @name="birthday" />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.strictEqual(form.$fields.length, 1);

    const field = form.$fields[0] as unknown as FieldPageObject;
    const input = field.$control;

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'date');

    assert.dom(field.$label).hasTagName('label');
    assert.dom(field.$label).hasText('Geburtstag');
    assert.dom(field.$description).hasText('Wann bist du geboren?');

    assert.dom(field.$label).hasAttribute('for', input.control.getAttribute('id') as string);
  });

  test('html attributes work', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Date @name="birthday" @label="Geburtstag" placeholder="abc" />
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
          <f.Date @name="birthday" @label="Geburtstag" disabled />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = (form.$fields[0] as unknown as FieldPageObject).$control;

    assert.dom(input.control).isDisabled();

    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Date @name="birthday" @label="Geburtstag" @disabled={{true}} />
        </Form>
      </template>
    );

    assert.dom(input.control).isDisabled();
  });

  test('data is shown', async function (assert) {
    const existingData = {
      birthday: '1970-01-01'
    };

    await render(
      <template>
        <Form @data={{existingData}} as |f|>
          <f.Date @name="birthday" @label="Geburtstag" />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = (form.$fields[0] as unknown as FieldPageObject).$control;

    assert.dom(input.control).hasValue('1970-01-01');
  });

  test('data is submitted', async function (assert) {
    const submit = Sinon.spy();

    await render(
      <template>
        <Form @data={{data}} @submit={{submit}} as |f|>
          <f.Date @name="birthday" @label="Geburtstag" />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = (form.$fields[0] as unknown as FieldPageObject).$control;

    await fillIn(input, '1970-01-01');
    await form.submit();

    assert.ok(submit.calledWith({ birthday: '1970-01-01' }));
  });
});
