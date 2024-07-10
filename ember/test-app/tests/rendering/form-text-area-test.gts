import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '@hokulea/ember';

import { FormPageObject } from '@hokulea/ember/test-support';

module('Rendering | <Form.TextArea>', function (hooks) {
  setupRenderingTest(hooks);

  const data = { notes: '' };

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.TextArea @label="Notizen" @description="Für dich selbst" @name="notes" />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.strictEqual(form.$fields.length, 1);

    const field = form.$fields[0];
    const input = field.$control;

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasTagName('textarea');

    assert.dom(field.$label).hasTagName('label');
    assert.dom(field.$label).hasText('Notizen');
    assert.dom(field.$description).hasText('Für dich selbst');

    assert.dom(field.$label).hasAttribute('for', input.control.getAttribute('id') as string);
  });

  test('html attributes work', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.TextArea @name="notes" @label="Notizen" placeholder="abc" />
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
          <f.TextArea @name="notes" @label="Notizen" disabled />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = form.$fields[0].$control;

    assert.dom(input.control).isDisabled();

    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.TextArea @name="notes" @label="Notizen" @disabled={{true}} />
        </Form>
      </template>
    );

    assert.dom(input.control).isDisabled();
  });
});
