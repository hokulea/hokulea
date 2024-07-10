import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '@hokulea/ember';

import { FormPageObject } from '@hokulea/ember/test-support';

import type { InputBuilderPageObject } from '@hokulea/ember/test-support';

module('Rendering | <Form.Currency>', function (hooks) {
  setupRenderingTest(hooks);

  const data = { contribution: 0 };

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Currency
            @label='Eigenanteil'
            @description='Wieviel zahlst du selbst?'
            @name='contribution'
          />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.strictEqual(form.$fields.length, 1);

    const field = form.$fields[0];
    const input = field.$control as InputBuilderPageObject;

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'text');
    assert.dom(input.control).hasAttribute('inputmode', 'decimal');

    assert.dom(input.$affix).hasText('€');

    assert.dom(field.$label).hasTagName('label');
    assert.dom(field.$label).hasText('Eigenanteil');
    assert.dom(field.$description).hasText('Wieviel zahlst du selbst?');

    assert.dom(field.$label).hasAttribute('for', input.control.getAttribute('id') as string);
  });

  test('html attributes work', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Currency @name='contribution' @label='Eigenanteil' placeholder='abc' />
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
          <f.Currency @name='contribution' @label='Eigenanteil' disabled />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = form.$fields[0].$control;

    assert.dom(input.control).isDisabled();

    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Currency @name='contribution' @label='Eigenanteil' @disabled={{true}} />
        </Form>
      </template>
    );

    assert.dom(input.control).isDisabled();
  });
});
