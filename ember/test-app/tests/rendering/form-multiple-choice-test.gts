import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '@hokulea/ember';

import { FormPageObject } from '@hokulea/ember/test-support';

import type { FieldPageObject } from '@hokulea/ember/test-support/page-objects/-private/field';

module('Rendering | <Form.MultipleChoice>', function (hooks) {
  setupRenderingTest(hooks);

  const data = { pets: [] };

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.MultipleChoice
            @label="Welche Haustiere hast du?"
            @description="Stofftiere zählen nicht ;)"
            @name="pets"
            as |r|
          >
            <r.Option @value="rhino" @label="Rhino" required />
            <r.Option @value="tiger" @label="Tiger" />
            <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
            <r.Option @value="kangaroo" @label="Kangaroo" />
          </f.MultipleChoice>
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.strictEqual(form.$fields.length, 1);

    const field = form.$fields[0] as FieldPageObject;

    assert.dom(field).hasTagName('fieldset');
    assert.dom(field.$label).hasTagName('legend');

    assert.dom(field.$label).hasText('Welche Haustiere hast du?');
    assert.dom(field.$description).hasText('Stofftiere zählen nicht ;)');

    assert.strictEqual(field.$choices.$options.length, 4);
  });

  test('html attributes work on options', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.MultipleChoice @name="pets" @label="Welche Haustiere hast du?" as |r|>
            <r.Option @value="rhino" @label="Rhino" required />
            <r.Option @value="tiger" @label="Tiger" />
            <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
            <r.Option @value="kangaroo" @label="Kangaroo" />
          </f.MultipleChoice>
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const field = form.$fields[0] as FieldPageObject;

    assert.dom(field.$choices.$options[0]?.$control).hasAttribute('required');
  });

  test('disabling one option', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.MultipleChoice @name="pets" @label="Welche Haustiere hast du?" as |r|>
            <r.Option @value="rhino" @label="Rhino" disabled />
            <r.Option @value="tiger" @label="Tiger" />
            <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
            <r.Option @value="kangaroo" @label="Kangaroo" />
          </f.MultipleChoice>
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const field = form.$fields[0] as FieldPageObject;

    assert.dom(field.$choices.$options[0]?.$control).isDisabled();
    assert.dom(field.$choices.$options[1]?.$control).isNotDisabled();
  });

  test('disabling the field', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.MultipleChoice
            @name="pets"
            @label="Welche Haustiere hast du?"
            @disabled={{true}}
            as |r|
          >
            <r.Option @value="rhino" @label="Rhino" />
            <r.Option @value="tiger" @label="Tiger" />
            <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
            <r.Option @value="kangaroo" @label="Kangaroo" />
          </f.MultipleChoice>
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const field = form.$fields[0] as FieldPageObject;

    for (const option of field.$choices.$options) {
      assert.dom(option.$control).isDisabled();
    }
  });

  test('option has label and description', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.MultipleChoice @name="pets" @label="Welche Haustiere hast du?" as |r|>
            <r.Option @value="rhino" @label="Rhino" />
            <r.Option @value="tiger" @label="Tiger" />
            <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
            <r.Option @value="kangaroo" @label="Kangaroo" />
          </f.MultipleChoice>
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const field = form.$fields[0] as FieldPageObject;

    assert.dom(field.$choices.$options[2]?.$label).hasText('Crocodile');
    assert.dom(field.$choices.$options[2]?.$label).hasTagName('label');
    assert.dom(field.$choices.$options[2]?.$description).hasText('Like a dinosaur');

    assert
      .dom(field.$choices.$options[2]?.$label)
      .hasAttribute(
        'for',
        field.$choices.$options[2]?.$control.element?.getAttribute('id') as string
      );
  });
});
