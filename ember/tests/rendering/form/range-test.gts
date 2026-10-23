import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '#src';
import { FormPageObject } from '#test-support';

import type { InputBuilderPageObject } from '#test-support';
import type { FieldPageObject } from '#test-support/page-objects/-private/field.ts';

module('Rendering | Form | <Form.Range>', function (hooks) {
  setupRenderingTest(hooks);

  const data = { contribution: 0 };

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Range
            @label="Eigenanteil"
            @description="Wieviel zahlst du selbst?"
            @name="contribution"
          />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.strictEqual(form.$fields.length, 1);

    const field = form.$fields[0] as unknown as FieldPageObject;
    const input = field.$control as InputBuilderPageObject;

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'range');

    assert.dom(field.$label).hasTagName('label');
    assert.dom(field.$label).hasText('Eigenanteil');
    assert.dom(field.$description).hasText('Wieviel zahlst du selbst?');

    assert.dom(field.$label).hasAttribute('for', input.control.getAttribute('id') as string);
  });

  test('html attributes work', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Range @name="contribution" @label="Eigenanteil" min="1" max="10" step="0.5" />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = (form.$fields[0] as unknown as FieldPageObject).$control;

    assert.dom(input.control).hasAttribute('min', '1');
    assert.dom(input.control).hasAttribute('max', '10');
    assert.dom(input.control).hasAttribute('step', '0.5');
  });

  test('disabling the input', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Range @name="contribution" @label="Eigenanteil" disabled />
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const input = (form.$fields[0] as unknown as FieldPageObject).$control;

    assert.dom(input.control).isDisabled();

    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Range @name="contribution" @label="Eigenanteil" @disabled={{true}} />
        </Form>
      </template>
    );

    assert.dom(input.control).isDisabled();
  });
});
