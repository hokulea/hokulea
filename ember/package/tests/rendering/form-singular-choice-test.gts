import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '#src';

import { FormPageObject } from '#test-support' ;

import type { FieldPageObject } from '@hokulea/ember/test-support/page-objects/-private/field';

module('Rendering | <Form.SingularChoice>', function (hooks) {
  setupRenderingTest(hooks);

  const data = { pet: '' };

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.SingularChoice
            @label="Welches ist dein Lieblingshaustier?"
            @description="Stofftiere zählen nicht ;)"
            @name="pet"
            as |r|
          >
            <r.Option @value="rhino" @label="Rhino" required />
            <r.Option @value="tiger" @label="Tiger" />
            <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
            <r.Option @value="kangaroo" @label="Kangaroo" />
          </f.SingularChoice>
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.strictEqual(form.$fields.length, 1);

    const field = form.$fields[0] as FieldPageObject;

    assert.dom(field).hasTagName('fieldset');
    assert.dom(field.$label).hasTagName('legend');

    assert.dom(field.$label).hasText('Welches ist dein Lieblingshaustier?');
    assert.dom(field.$description).hasText('Stofftiere zählen nicht ;)');

    assert.strictEqual(field.$choices.$options.length, 4);
  });

  test('html attributes work on options', async function (assert) {
    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.SingularChoice @name="pet" @label="Welches ist dein Lieblingshaustier?" as |r|>
            <r.Option @value="rhino" @label="Rhino" required />
            <r.Option @value="tiger" @label="Tiger" />
            <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
            <r.Option @value="kangaroo" @label="Kangaroo" />
          </f.SingularChoice>
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
          <f.SingularChoice @name="pet" @label="Welches ist dein Lieblingshaustier?" as |r|>
            <r.Option @value="rhino" @label="Rhino" disabled />
            <r.Option @value="tiger" @label="Tiger" />
            <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
            <r.Option @value="kangaroo" @label="Kangaroo" />
          </f.SingularChoice>
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
          <f.SingularChoice
            @name="pet"
            @label="Welches ist dein Lieblingshaustier?"
            @disabled={{true}}
            as |r|
          >
            <r.Option @value="rhino" @label="Rhino" />
            <r.Option @value="tiger" @label="Tiger" />
            <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
            <r.Option @value="kangaroo" @label="Kangaroo" />
          </f.SingularChoice>
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
          <f.SingularChoice @name="pet" @label="Welches ist dein Lieblingshaustier?" as |r|>
            <r.Option @value="rhino" @label="Rhino" />
            <r.Option @value="tiger" @label="Tiger" />
            <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
            <r.Option @value="kangaroo" @label="Kangaroo" />
          </f.SingularChoice>
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
