import { on } from '@ember/modifier';
import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { getProperty } from 'dot-prop';
import sinon from 'sinon';

import { createForm } from '#src';

export function pick<V = unknown>(path: string, action?: (value: V) => void) {
  return function (event: object): V | void {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const value = getProperty(event, path) as V;

    if (!action) {
      return value;
    }

    action(value);
  };
}

module('createForm', (hooks) => {
  setupRenderingTest(hooks);

  test('works with plain form', async (assert) => {
    const submitHandler = sinon.spy();

    await render(
      <template>
        {{#let (createForm submit=submitHandler) as |f|}}
          <form novalidate {{f.registerForm}}>
            <input type="text" name="givenName" value="Luke" />
            <input type="text" name="familyName" value="Skywalker" />
            <input type="number" name="age" value="19" />

            <button type="submit">Let's go</button>
          </form>
        {{/let}}
      </template>
    );

    await click('button');

    assert.ok(submitHandler.calledWith({ givenName: 'Luke', familyName: 'Skywalker', age: '19' }));
  });

  module('Reactivity', () => {
    test('value is reactive', async (assert) => {
      await render(
        <template>
          {{#let (createForm) as |f|}}
            <form novalidate {{f.registerForm}}>
              {{#let (f.createField name="givenName") as |fd|}}
                <input
                  type="text"
                  {{fd.registerField}}
                  name={{fd.name}}
                  {{on "change" (pick "target.value" fd.setValue)}}
                />
                <output>{{fd.value}}</output>
              {{/let}}

              <button type="submit">Let's go</button>
            </form>
          {{/let}}
        </template>
      );

      assert.dom('output').hasNoValue();

      await fillIn('input[type="text"]', 'Luke');

      assert.dom('output').hasValue('Luke');
    });

    test('issues are reactive', async (assert) => {
      await render(
        <template>
          {{#let (createForm) as |f|}}
            <form novalidate {{f.registerForm}}>
              {{#let (f.createField name="givenName") as |fd|}}
                <input
                  type="text"
                  {{fd.registerField}}
                  name={{fd.name}}
                  {{on "change" (pick "target.value" fd.setValue)}}
                  required
                />
                {{#if fd.issues}}
                  <ul>
                    {{#each fd.issues as |issue|}}
                      <li>{{issue.message}}</li>
                    {{/each}}
                  </ul>
                {{/if}}
              {{/let}}

              <button type="submit">Let's go</button>
            </form>
          {{/let}}
        </template>
      );

      assert.dom('ul').doesNotExist();

      await click('button');

      assert.dom('ul').exists();
      assert.dom('li').exists({ count: 1 });
    });

    test('form.invalid is reactive', async (assert) => {
      await render(
        <template>
          {{#let (createForm) as |f|}}
            <form novalidate {{f.registerForm}}>
              {{#let (f.createField name="givenName") as |fd|}}
                <input
                  type="text"
                  {{fd.registerField}}
                  name={{fd.name}}
                  {{on "change" (pick "target.value" fd.setValue)}}
                  required
                />
              {{/let}}

              <button type="submit" aria-disabled={{f.invalid}}>Let's go</button>
            </form>
          {{/let}}
        </template>
      );

      assert.dom('button').doesNotHaveAria('disabled');

      await click('button');

      assert.dom('button').hasAria('disabled');
    });

    test('form.validated is reactive', async (assert) => {
      await render(
        <template>
          {{#let (createForm) as |f|}}
            <form novalidate {{f.registerForm}}>
              {{#let (f.createField name="givenName") as |fd|}}
                <input
                  type="text"
                  {{fd.registerField}}
                  name={{fd.name}}
                  {{on "change" (pick "target.value" fd.setValue)}}
                  data-validated={{fd.validated}}
                  required
                />
              {{/let}}

              <button type="submit" aria-disabled={{f.invalid}}>Let's go</button>
            </form>
          {{/let}}
        </template>
      );

      assert.dom('input[type="text"]').doesNotHaveAttribute('data-validated');

      await click('button');

      // eslint-disable-next-line unicorn/prefer-dom-node-dataset
      assert.dom('input[type="text"]').hasAttribute('data-validated');
    });
  });
});
