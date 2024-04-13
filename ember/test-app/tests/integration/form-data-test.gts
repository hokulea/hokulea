import { tracked } from '@glimmer/tracking';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { click, fillIn, render, rerender, select, triggerEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { Button, Form } from '@hokulea/ember';

import { FormPageObject } from '@hokulea/ember/test-support';

module('Integration | <Form> | Data', function (hooks) {
  setupRenderingTest(hooks);

  module('data down', function () {
    test('data is passed to form controls', async function (assert) {
      const countries = [
        {
          code: 'USA',
          name: 'United States'
        },
        {
          code: 'GER',
          name: 'Germany'
        }
      ];
      const data = {
        givenName: 'Tony',
        familyName: 'Ward',
        gender: 'male',
        country: countries[0],
        comments: 'lorem ipsum',
        acceptTerms: true,
        age: 21
      };

      await render(
        <template>
          <Form @data={{data}} as |f|>
            <f.Text @name='givenName' @label='Given Name' />
            <f.Text @name='familyName' @label='Family Name' />
            <f.SingularChoice @name='gender' @label='Gender' as |group|>
              <group.Option @value='male' @label='Male' />
              <group.Option @value='female' @label='Female' />
              <group.Option @value='other' @label='Other' />
            </f.SingularChoice>
            <f.Number @name='age' @label='Age' />
            <f.Select @name='country' @label='Country' as |s|>
              <s.Option @value='USA'>United States</s.Option>
              <s.Option @value='GER'>Germany</s.Option>
            </f.Select>
            <f.TextArea @name='comments' @label='Comments' />
            <f.Checkbox @name='acceptTerms' @label='Terms accepted' />
          </Form>
        </template>
      );

      const form = new FormPageObject();

      assert.dom(form.field('givenName')?.$control.element).hasValue('Tony');
      assert.dom(form.field('familyName')?.$control.element).hasValue('Ward');
      assert.dom(form.field('gender')?.$choices.option('male')?.$control.element).isChecked();
      assert.dom(form.field('gender')?.$choices.option('female')?.$control.element).isNotChecked();
      assert.dom(form.field('gender')?.$choices.option('other')?.$control.element).isNotChecked();

      assert.dom(form.field('age')?.$control.element).hasValue('21');
      assert.dom(form.field('country')?.$control.element).hasValue('USA');
      assert.dom(form.field('comments')?.$control.element).hasValue('lorem ipsum');
      assert.dom(form.field('acceptTerms')?.$control.element).isChecked();
    });

    test('value is yielded from field component', async function (assert) {
      const data = { givenName: 'Tony', familyName: 'Ward' };

      await render(
        <template>
          <Form @data={{data}} as |form|>
            <form.Field @name='givenName' @label='Given Name' as |field|>
              <div data-test-given-name>{{field.value}}</div>
            </form.Field>
            <form.Field @name='familyName' @label='Family Name' as |field|>
              <div data-test-family-name>{{field.value}}</div>
            </form.Field>
          </Form>
        </template>
      );

      assert.dom('[data-test-given-name]').hasText('Tony');
      assert.dom('[data-test-family-name]').hasText('Ward');
    });

    test('form controls are reactive to updating data', async function (assert) {
      interface Data {
        givenName: string;
        familyName: string;
      }
      class Context {
        @tracked data?: Data;
      }

      const ctx = new Context();

      ctx.data = { givenName: 'Tony', familyName: 'Ward' };

      await render(
        <template>
          <Form @data={{ctx.data}} as |form|>
            <form.Text @name='givenName' @label='Given Name' />
            <form.Text @name='familyName' @label='Family Name' />
          </Form>
        </template>
      );

      const form = new FormPageObject();

      assert.dom(form.field('givenName')?.$control.element).hasValue('Tony');
      assert.dom(form.field('familyName')?.$control.element).hasValue('Ward');

      ctx.data = { givenName: 'Luke', familyName: 'Skywalker' };

      await rerender();

      assert.dom(form.field('givenName')?.$control.element).hasValue('Luke');
      assert.dom(form.field('familyName')?.$control.element).hasValue('Skywalker');
    });

    test('form controls are reactive to updating data properties', async function (assert) {
      class DummyData {
        @tracked givenName = 'Tony';

        @tracked familyName = 'Ward';
      }

      const data = new DummyData();

      await render(
        <template>
          <Form @data={{data}} as |form|>
            <form.Text @name='givenName' @label='Given Name' />
            <form.Text @name='familyName' @label='Family Name' />
          </Form>
        </template>
      );

      const form = new FormPageObject();

      assert.dom(form.field('givenName')?.$control.element).hasValue('Tony');
      assert.dom(form.field('familyName')?.$control.element).hasValue('Ward');

      data.givenName = 'Luke';
      data.familyName = 'Skywalker';

      await rerender();

      assert.dom(form.field('givenName')?.$control.element).hasValue('Luke');
      assert.dom(form.field('familyName')?.$control.element).hasValue('Skywalker');
    });

    test('form controls keep dirty state when updating data properties', async function (assert) {
      class DummyData {
        @tracked givenName = 'Tony';

        @tracked familyName = 'Ward';
      }

      const data = new DummyData();

      await render(
        <template>
          <Form @data={{data}} as |form|>
            <form.Text @name='givenName' @label='Given Name' />
            <form.Text @name='familyName' @label='Family Name' />
          </Form>
        </template>
      );

      const form = new FormPageObject();

      assert.dom(form.field('givenName')?.$control.element).hasValue('Tony');
      assert.dom(form.field('familyName')?.$control.element).hasValue('Ward');

      await fillIn(form.field('givenName')?.$control.element as HTMLInputElement, 'Palpatine');

      data.givenName = 'Luke';
      data.familyName = 'Skywalker';

      await rerender();

      assert.dom(form.field('givenName')?.$control.element).hasValue('Palpatine');
      assert.dom(form.field('familyName')?.$control.element).hasValue('Skywalker');
    });

    test('data is not mutated', async function (assert) {
      const data = { givenName: 'Tony', familyName: 'Ward' };

      await render(
        <template>
          <Form @data={{data}} as |form|>
            <form.Text @name='givenName' @label='Given Name' />
            <form.Text @name='familyName' @label='Family Name' />
          </Form>
        </template>
      );

      const form = new FormPageObject();

      await fillIn(form.field('givenName')?.$control.element as HTMLInputElement, 'Palpatine');
      assert.dom(form.field('givenName')?.$control.element).hasValue('Palpatine');
      assert.strictEqual(data.givenName, 'Tony', 'data object is not mutated after entering data');

      await triggerEvent(form.element as HTMLFormElement, 'submit');
      assert.dom(form.field('givenName')?.$control.element).hasValue('Palpatine');
      assert.strictEqual(data.givenName, 'Tony', 'data object is not mutated after submitting');
    });
  });

  module('actions up', function () {
    test('@submit is called with user data', async function (assert) {
      const data = {
        givenName: 'Tony',
        familyName: 'Ward',
        gender: 'male',
        country: 'USA',
        comments: 'lorem ipsum',
        acceptTerms: false,
        age: 21
      };
      const submitHandler = sinon.spy();

      await render(
        <template>
          <Form @data={{data}} @submit={{submitHandler}} as |f|>
            <f.Text @name='givenName' @label='Given Name' />
            <f.Text @name='familyName' @label='Family Name' />
            <f.SingularChoice @name='gender' @label='Gender' as |group|>
              <group.Option @value='male' @label='Male' />
              <group.Option @value='female' @label='Female' />
              <group.Option @value='other' @label='Other' />
            </f.SingularChoice>
            <f.Number @name='age' @label='Age' />
            <f.Select @name='country' @label='Country' as |s|>
              <s.Option @value='USA'>United States</s.Option>
              <s.Option @value='GER'>Germany</s.Option>
            </f.Select>
            <f.TextArea @name='comments' @label='Comments' />
            <f.Checkbox @name='acceptTerms' @label='Terms accepted' />
          </Form>
        </template>
      );

      const form = new FormPageObject();

      assert.dom(form.field('givenName')?.$control.element).hasValue('Tony');
      assert.dom(form.field('familyName')?.$control.element).hasValue('Ward');
      assert.dom(form.field('comments')?.$control.element).hasValue('lorem ipsum');
      assert.dom(form.field('acceptTerms')?.$control.element).isNotChecked();

      await fillIn(form.field('givenName')?.$control.element as HTMLInputElement, 'Nicole');
      await fillIn(form.field('familyName')?.$control.element as HTMLInputElement, 'Chung');
      await select(form.field('country')?.$control.element as HTMLSelectElement, 'GER');
      await click(
        form.field('gender')?.$choices.option('female')?.$control.element as HTMLInputElement
      );
      await fillIn(form.field('age')?.$control.element as HTMLInputElement, '20');
      await fillIn(form.field('comments')?.$control.element as HTMLInputElement, 'foo bar');
      await click(form.field('acceptTerms')?.$control.element as HTMLInputElement);
      await form.submit();

      assert.deepEqual(
        data,
        {
          givenName: 'Tony',
          familyName: 'Ward',
          gender: 'male',
          country: 'USA',
          comments: 'lorem ipsum',
          acceptTerms: false,
          age: 21
        },
        'original data is not mutated'
      );

      // console.log('submitted data', { ...submitHandler.firstCall.args[0] });

      assert.true(
        submitHandler.calledWith({
          givenName: 'Nicole',
          familyName: 'Chung',
          gender: 'female',
          country: 'GER',
          comments: 'foo bar',
          acceptTerms: true,
          age: 20
        }),
        'new data is passed to submit handler'
      );
    });

    test('submit action is yielded', async function (assert) {
      const data = {
        givenName: 'Tony',
        familyName: 'Ward'
      };
      const submitHandler = sinon.spy();

      await render(
        <template>
          <Form @data={{data}} @submit={{submitHandler}} as |form|>
            <form.Text @name='givenName' @label='Given Name' />
            <form.Text @name='familyName' @label='Family Name' />

            <Button @push={{form.submit}} data-test-submit>Submit</Button>
          </Form>
        </template>
      );

      const form = new FormPageObject();

      assert.dom(form.field('givenName')?.$control.element).hasValue('Tony');
      assert.dom(form.field('familyName')?.$control.element).hasValue('Ward');

      await fillIn(form.field('givenName')?.$control.element as HTMLInputElement, 'Nicole');
      await fillIn(form.field('familyName')?.$control.element as HTMLInputElement, 'Chung');

      await click('[data-test-submit]');

      assert.true(
        submitHandler.calledWith({
          givenName: 'Nicole',
          familyName: 'Chung'
        }),
        'new data is passed to submit handler'
      );
    });

    test('setValue yielded from field sets internal value', async function (assert) {
      const data = { givenName: 'Tony' };

      await render(
        <template>
          <Form @data={{data}} as |form|>
            <form.Field @name='givenName' @label='' as |field|>
              <label for='given-name'>First name:</label>
              <input type='text' value={{field.value}} id='given-name' data-test-given-name />
              <button
                type='button'
                {{on 'click' (fn field.setValue 'Nicole')}}
                data-test-custom-control
              >
                Update
              </button>
            </form.Field>
          </Form>
        </template>
      );

      assert.dom('input[data-test-given-name]').hasValue('Tony');

      await click('[data-test-custom-control]');

      assert.deepEqual(data, { givenName: 'Tony' }, 'data is not mutated');

      assert.dom('input[data-test-given-name]').hasValue('Nicole');
    });
  });

  module('@dataMode="mutable"', function () {
    test('mutates passed @data when form fields are updated', async function (assert) {
      const data = { givenName: 'Tony', familyName: 'Ward' };

      await render(
        <template>
          <Form @data={{data}} @dataMode='mutable' as |form|>
            <form.Text @name='givenName' @label='Given Name' />
            <form.Text @name='familyName' @label='Family Name' />
          </Form>
        </template>
      );

      const form = new FormPageObject();

      await fillIn(form.field('givenName')?.$control.element as HTMLInputElement, 'Luke');
      assert.dom(form.field('givenName')?.$control.element).hasValue('Luke');
      assert.strictEqual(data.givenName, 'Luke', 'data object is mutated after entering data');
    });

    test('@submit is called with same instance of @data', async function (assert) {
      const data = { givenName: 'Tony', familyName: 'Ward' };
      const submitHandler = sinon.spy();

      await render(
        <template>
          <Form @data={{data}} @dataMode='mutable' @submit={{submitHandler}} as |form|>
            <form.Text @name='givenName' @label='Given Name' />
            <form.Text @name='familyName' @label='Family Name' />
          </Form>
        </template>
      );

      const form = new FormPageObject();

      await fillIn(form.field('givenName')?.$control.element as HTMLInputElement, 'Luke');

      await form.submit();

      assert.strictEqual(
        submitHandler.firstCall.firstArg,
        data,
        '@submit is called with same instance of @data, not a copy'
      );
    });
  });
});
