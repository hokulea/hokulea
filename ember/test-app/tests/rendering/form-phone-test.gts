import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '@hokulea/ember';

import { FormPageObject } from '@hokulea/ember/test-support';

module('Rendering | <Form.Phone>', function (hooks) {
  setupRenderingTest(hooks);

  const data = { phone: '' };

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Phone @label='Telefon' @description="How'd you gonna called?" @name='phone' />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.strictEqual(form.$fields.length, 1);

    const field = form.$fields[0];
    const input = field.$control;

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'tel');

    assert.dom(field.$label).hasTagName('label');
    assert.dom(field.$label).hasText('Telefon');
    assert.dom(field.$description).hasText("How'd you gonna called?");

    assert.dom(field.$label).hasAttribute('for', input.control.getAttribute('id') as string);
  });

  test('html attributes work', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Phone @name='phone' @label='Telefon' placeholder='abc' />
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
          <f.Phone @name='phone' @label='Telefon' disabled />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = form.$fields[0].$control;

    assert.dom(input.control).isDisabled();

    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Phone @name='phone' @label='Telefon' @disabled={{true}} />
        </Form>
      </template>
    );

    assert.dom(input.control).isDisabled();
  });
});
