import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '#src';
import { FormPageObject } from '#test-support';

import { Importance, Intent } from '@hokulea/tokens';

module('Rendering | <Form>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the form', async function (assert) {
    await render(<template><Form /></template>);

    const form = new FormPageObject();

    assert.dom(form).exists();
    assert.dom(form).hasTagName('form');
  });

  test('it accepts html attributes', async function (assert) {
    await render(<template><Form class="foo" autocomplete="off" /></template>);

    const form = new FormPageObject();

    assert
      .dom(form)
      .hasClass('foo', 'it accepts custom HTML classes')
      .hasAttribute('autocomplete', 'off', 'it accepts arbitrary HTML attributes');
  });

  test('yields a submit button', async function (assert) {
    await render(
      <template>
        <Form as |f|>
          <f.Submit>Send</f.Submit>
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.dom(form.$submit).exists();
    assert.strictEqual(form.$submit.intent, Intent.Action);
    assert.strictEqual(form.$submit.importance, Importance.Supreme);
  });

  test('yields a reset button', async function (assert) {
    await render(
      <template>
        <Form as |f|>
          <f.Reset>Reset</f.Reset>
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.dom(form.$reset).exists();
    assert.strictEqual(form.$reset.intent, Intent.Action);
    assert.strictEqual(form.$reset.importance, Importance.Supreme);
  });
});
