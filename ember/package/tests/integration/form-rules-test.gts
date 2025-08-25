import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import * as v from 'valibot';

import { Form } from '#src';

import { FormPageObject } from '#src/test-support/index.ts';

const passwordSchema = v.pipe(
  v.optional(v.string(), ''),
  v.string(),
  v.minLength(8),
  v.regex(/[A-Z]/, 'upper'),
  v.regex(/[a-z]/, 'lower'),
  v.regex(/[0-9]/, 'number'),
  v.regex(/[^A-Za-z0-9]/, 'special')
);

module('Integration | <Form> | <:rules>', function (hooks) {
  setupRenderingTest(hooks);

  test('Rules are checking per met condition', async function (assert) {
    await render(
      <template>
        <Form as |f|>
          <f.Password @name="password" @label="Password" @validate={{passwordSchema}} required>
            <:rules as |Rule|>
              <Rule @key="type" @value="min_length">must be at least 8 characters</Rule>
              <Rule @key="message" @value="upper">must contain at least one uppercase letter</Rule>
              <Rule @key="message" @value="lower">must contain at least one lowercase letter</Rule>
              <Rule @key="message" @value="number">must contain at least one number</Rule>
              <Rule @key="message" @value="special">must contain at least one special character</Rule>
            </:rules>
          </f.Password>
        </Form>
      </template>
    );

    const form = new FormPageObject();
    const pw = form.field('password');

    assert.dom(pw.$rules[0]).hasAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[1]).hasAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[2]).hasAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[3]).hasAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[4]).hasAttribute('data-test-rule-invalid');

    await fillIn(pw.$control, 'T');

    assert.dom(pw.$rules[0]).hasAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[1]).doesNotHaveAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[2]).hasAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[3]).hasAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[4]).hasAttribute('data-test-rule-invalid');

    await fillIn(pw.$control, 'Test');

    assert.dom(pw.$rules[0]).hasAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[1]).doesNotHaveAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[2]).doesNotHaveAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[3]).hasAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[4]).hasAttribute('data-test-rule-invalid');

    await fillIn(pw.$control, 'Test123');

    assert.dom(pw.$rules[0]).hasAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[1]).doesNotHaveAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[2]).doesNotHaveAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[3]).doesNotHaveAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[4]).hasAttribute('data-test-rule-invalid');

    await fillIn(pw.$control, 'Test12$');

    assert.dom(pw.$rules[0]).hasAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[1]).doesNotHaveAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[2]).doesNotHaveAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[3]).doesNotHaveAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[4]).doesNotHaveAttribute('data-test-rule-invalid');

    await fillIn(pw.$control, 'Test123$');

    assert.dom(pw.$rules[0]).doesNotHaveAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[1]).doesNotHaveAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[2]).doesNotHaveAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[3]).doesNotHaveAttribute('data-test-rule-invalid');
    assert.dom(pw.$rules[4]).doesNotHaveAttribute('data-test-rule-invalid');
  });
});
