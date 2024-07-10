import { blur, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { Form } from '@hokulea/ember';

import { FormPageObject } from '@hokulea/ember/test-support';

import type { RenderingTestContext } from '@ember/test-helpers';

module('Integration | <Form> | Native validation', function (hooks) {
  setupRenderingTest(hooks);

  interface TestFormData {
    givenName?: string;
    familyName?: string;
  }

  test('form has novalidate to render custom validation errors', async function (assert) {
    const data: TestFormData = {};
    const submitHandler = sinon.spy();

    await render(
      <template>
        <Form @data={{data}} @submit={{submitHandler}} as |form|>
          <form.Text @name='givenName' @label='Given Name' required />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert.dom(form).hasAttribute('novalidate');
  });

  test('@submit is not called when validation fails', async function (assert) {
    const data: TestFormData = {};
    const submitHandler = sinon.spy();

    await render(
      <template>
        <Form @data={{data}} @submit={{submitHandler}} as |form|>
          <form.Text @name='givenName' @label='Given Name' required />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    await form.submit();

    assert.false(submitHandler.called, '@submit is not called when required field in empty');
  });

  test('@invalidated is called when validation fails', async function (assert) {
    const data: TestFormData = {};
    const invalidHandler = sinon.spy();

    await render(
      <template>
        <Form @data={{data}} @invalidated={{invalidHandler}} as |form|>
          <form.Text @name='givenName' @label='Given Name' required />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    await form.submit();

    assert.true(invalidHandler.calledOnce, '@invalidated was called when required field in empty');
  });

  test('@submit is called when validation passes', async function (assert) {
    const data: TestFormData = {};
    const submitHandler = sinon.spy();

    await render(
      <template>
        <Form @data={{data}} @submit={{submitHandler}} as |form|>
          <form.Text @name='givenName' @label='Given Name' required />
          <form.Text @name='familyName' @label='Family Name' required />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    await fillIn(form.field('givenName').$control, 'Nicole');
    await fillIn(form.field('familyName').$control, 'Nicole');

    await form.submit();

    assert.true(submitHandler.called, '@submit has been called');
  });

  test('validation errors are revalidated on submit', async function (assert) {
    const data: TestFormData = {};

    await render(
      <template>
        <Form @data={{data}} as |form|>
          <form.Text @name='givenName' @label='Given Name' required />
          <form.Text @name='familyName' @label='Family Name' />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    assert
      .dom(form.field('givenName').$errors)
      .doesNotExist('validation errors are not rendered before validation happens');
    assert
      .dom(form.field('familyName').$errors)
      .doesNotExist('validation errors are not rendered before validation happens');

    await form.submit();

    assert
      .dom(form.field('givenName').$errors)
      .exists({ count: 1 }, 'validation errors appear when validation fails');
    assert
      .dom(form.field('familyName').$errors)
      .doesNotExist('validation errors are not rendered when validation succeeds');
  });

  test('<Errors> renders all error messages in non-block mode', async function (assert) {
    const data: TestFormData = {};

    await render(
      <template>
        <Form @data={{data}} as |form|>
          <form.Text @name='givenName' @label='Given Name' required />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    await form.submit();

    assert.dom(form.field('givenName').$errors).exists({ count: 1 }).hasAnyText(); // validation error message is browser and locale dependant, so testing against actual message would be very brittle.
  });

  test('works with setCustomValidity', async function (this: RenderingTestContext, assert) {
    const data: TestFormData = {};

    await render(
      <template>
        <Form @data={{data}} as |form|>
          <form.Text @name='givenName' @label='Given Name' required />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    const input = form.field('givenName').$control.element as HTMLInputElement;

    input.setCustomValidity('This is a custom error message');

    await form.submit();

    assert
      .dom(form.field('givenName').$errors)
      .exists({ count: 1 }, 'validation errors appear when validation fails');

    assert
      .dom(form.field('givenName').$errors)
      .exists({ count: 1 })
      .hasText('This is a custom error message');
  });

  test('validation errors mark the control as invalid', async function (assert) {
    const data: TestFormData = {};

    await render(
      <template>
        <Form @data={{data}} as |form|>
          <form.Text @name='givenName' @label='Given Name' required />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    await form.submit();

    assert.dom(form.field('givenName').$control).hasAria('invalid', 'true');
  });

  test('native validation errors are merged with custom validation errors', async function (assert) {
    const data = { givenName: 'foo123', familyName: 'Smith' };
    const validateForm = ({ givenName }: { givenName: string }) =>
      givenName.charAt(0).toUpperCase() !== givenName.charAt(0)
        ? {
            givenName: [
              {
                type: 'uppercase',
                value: givenName,
                message: 'Given name must be upper case!'
              }
            ]
          }
        : undefined;
    const validateField = (givenName: string) =>
      givenName.toLowerCase().startsWith('foo')
        ? [
            {
              type: 'notFoo',
              value: givenName,
              message: 'Foo is an invalid given name!'
            }
          ]
        : undefined;

    await render(
      <template>
        <Form @data={{data}} @validate={{validateForm}} as |form|>
          <form.Text
            @name='givenName'
            @label='Given Name'
            @validate={{validateField}}
            required
            pattern='^[A-Za-z]+$'
          />
          <form.Text @name='familyName' @label='Family Name' />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    await form.submit();

    assert.strictEqual(form.field('givenName').$errors.length, 3);

    assert.strictEqual(form.field('givenName').$errors[0].type, 'native');
    assert.strictEqual(form.field('givenName').$errors[0].value, 'foo123');
    assert.dom(form.field('givenName').$errors[0]).hasAnyText(); // validation error message is browser and locale dependant, so testing against actual message would be very brittle.

    assert.strictEqual(form.field('givenName').$errors[1].type, 'uppercase');
    assert.strictEqual(form.field('givenName').$errors[1].value, 'foo123');
    assert.dom(form.field('givenName').$errors[1]).hasText('Given name must be upper case!');

    assert.strictEqual(form.field('givenName').$errors[2].type, 'notFoo');
    assert.strictEqual(form.field('givenName').$errors[2].value, 'foo123');
    assert.dom(form.field('givenName').$errors[2]).hasText('Foo is an invalid given name!');

    assert.dom(form.field('familyName').$errors).doesNotExist();
  });

  test('no validation errors render when form data is valid', async function (assert) {
    const data = { givenName: 'John', familyName: 'Smith' };
    const validateForm = ({ givenName }: { givenName: string }) =>
      givenName.charAt(0).toUpperCase() !== givenName.charAt(0)
        ? {
            givenName: [
              {
                type: 'uppercase',
                value: givenName,
                message: 'First name must be upper case!'
              }
            ]
          }
        : undefined;
    const validateField = (givenName: string) =>
      givenName.toLowerCase().startsWith('foo')
        ? [
            {
              type: 'notFoo',
              value: givenName,
              message: 'Foo is an invalid first name!'
            }
          ]
        : undefined;

    await render(
      <template>
        <Form @data={{data}} @validate={{validateForm}} as |form|>
          <form.Text
            @name='givenName'
            @label='Given Name'
            @validate={{validateField}}
            required
            pattern='^[A-Za-z]+$'
          />
          <form.Text @name='familyName' @label='Family Name' />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    await form.submit();

    assert.dom(form.field('givenName').$errors).doesNotExist();
    assert.dom(form.field('familyName').$errors).doesNotExist();
  });

  test('opt out of native validation using @ignoreNativeValidation', async function (assert) {
    const data: TestFormData = { givenName: 'john' };
    const validateForm = ({ givenName }: TestFormData) =>
      givenName?.charAt(0).toUpperCase() !== givenName?.charAt(0)
        ? {
            givenName: [
              {
                type: 'uppercase',
                value: givenName,
                message: 'Given name must be upper case!'
              }
            ]
          }
        : undefined;

    await render(
      <template>
        <Form @data={{data}} @validate={{validateForm}} @ignoreNativeValidation={{true}} as |form|>
          <form.Text @name='givenName' @label='Given Name' required pattern='^[A-Za-z]+$' />
          <form.Text @name='familyName' @label='Family Name' required />
        </Form>
      </template>
    );

    const form = new FormPageObject();

    await form.submit();

    assert.strictEqual(form.field('givenName').$errors.type, 'uppercase');
    assert.strictEqual(form.field('givenName').$errors.value, 'john');
    assert.dom(form.field('givenName').$errors).hasText('Given name must be upper case!');

    assert.dom(form.field('familyName').$errors).doesNotExist();
  });

  module(`@validateOn`, function () {
    module('@validateOn=focusout', function () {
      test('validation errors are exposed on focusout', async function (assert) {
        const data: TestFormData = {};

        await render(
          <template>
            <Form @data={{data}} @validateOn='focusout' as |form|>
              <form.Text @name='givenName' @label='Given Name' required pattern='^[A-Za-z]+$' />
              <form.Text @name='familyName' @label='Family Name' required pattern='^[A-Za-z]+$' />
            </Form>
          </template>
        );

        const form = new FormPageObject();

        assert
          .dom(form.field('givenName').$errors)
          .doesNotExist('validation errors are not rendered before form is filled in');
        assert
          .dom(form.field('familyName').$errors)
          .doesNotExist('validation errors are not rendered before form is filled in');

        await fillIn(form.field('givenName').$control, '123');

        assert
          .dom(form.field('givenName').$errors)
          .doesNotExist('validation errors are not rendered before validation happens on focusout');
        assert
          .dom(form.field('familyName').$errors)
          .doesNotExist('validation errors are not rendered before validation happens on focusout');

        await blur(form.field('givenName').$control);

        assert
          .dom(form.field('givenName').$errors)
          .exists({ count: 1 }, 'validation errors appear on focusout when validation fails');
        assert
          .dom(form.field('familyName').$errors)
          .doesNotExist('validation errors are not rendered for untouched fields');
      });
    });

    module('@validateOn=change', function () {
      test('validation errors are exposed on change', async function (assert) {
        const data: TestFormData = {};

        await render(
          <template>
            <Form @data={{data}} @validateOn='change' as |form|>
              <form.Text @name='givenName' @label='Given Name' required pattern='^[A-Za-z]+$' />
              <form.Text @name='familyName' @label='Family Name' required pattern='^[A-Za-z]+$' />
            </Form>
          </template>
        );

        const form = new FormPageObject();

        assert
          .dom(form.field('givenName').$errors)
          .doesNotExist('validation errors are not rendered before validation happens on change');
        assert
          .dom(form.field('familyName').$errors)
          .doesNotExist('validation errors are not rendered before validation happens on change');

        await fillIn(form.field('givenName').$control, '123');

        assert
          .dom(form.field('givenName').$errors)
          .exists({ count: 1 }, 'validation errors appear on focusout when validation fails');
        assert
          .dom(form.field('familyName').$errors)
          .doesNotExist('validation errors are not rendered for untouched fields');
      });
    });
  });

  module(`@revalidateOn`, function () {
    module('@revalidateOn=focusout', function () {
      test('validation errors are exposed on focusout', async function (assert) {
        const data: TestFormData = {};

        await render(
          <template>
            <Form @data={{data}} @revalidateOn='focusout' as |form|>
              <form.Text @name='givenName' @label='Given Name' required pattern='^[A-Za-z]+$' />
              <form.Text @name='familyName' @label='Family Name' required pattern='^[A-Za-z]+$' />
            </Form>
          </template>
        );

        const form = new FormPageObject();

        assert
          .dom(form.field('givenName').$errors)
          .doesNotExist('validation errors are not rendered before before form is filled in');
        assert
          .dom(form.field('familyName').$errors)
          .doesNotExist('validation errors are not rendered before before form is filled in');

        await fillIn(form.field('givenName').$control, '123');

        assert
          .dom(form.field('givenName').$errors)
          .doesNotExist(
            'validation errors are not rendered before initial validation happens on submit'
          );
        assert
          .dom(form.field('familyName').$errors)
          .doesNotExist(
            'validation errors are not rendered before initial validation happens on submit'
          );

        await blur(form.field('givenName').$control);

        assert
          .dom(form.field('givenName').$errors)
          .doesNotExist(
            'validation errors are not rendered before initial validation happens on submit'
          );
        assert
          .dom(form.field('familyName').$errors)
          .doesNotExist(
            'validation errors are not rendered before initial validation happens on submit'
          );

        await form.submit();

        assert
          .dom(form.field('givenName').$errors)
          .exists({ count: 1 }, 'validation errors appear on submit when validation fails');
        assert
          .dom(form.field('familyName').$errors)
          .exists({ count: 1 }, 'validation errors appear on submit when validation fails');

        await fillIn(form.field('givenName').$control, 'Tony');

        assert
          .dom(form.field('givenName').$errors)
          .exists(
            { count: 1 },
            'validation errors do not disappear until revalidation happens on focusout'
          );
        assert
          .dom(form.field('familyName').$errors)
          .exists(
            { count: 1 },
            'validation errors do not disappear until revalidation happens on focusout'
          );

        await blur(form.field('givenName').$control);

        assert
          .dom(form.field('givenName').$errors)
          .doesNotExist('validation errors disappear after successful revalidation on focusout');
        assert
          .dom(form.field('familyName').$errors)
          .exists(
            { count: 1 },
            'validation errors do not disappear until revalidation happens on focusout'
          );
      });
    });

    module('@revalidateOn=change', function () {
      test('validation errors are revalidated on change', async function (assert) {
        const data: TestFormData = {};

        await render(
          <template>
            <Form @data={{data}} @revalidateOn='change' as |form|>
              <form.Text @name='givenName' @label='Given Name' required pattern='^[A-Za-z]+$' />
              <form.Text @name='familyName' @label='Family Name' required pattern='^[A-Za-z]+$' />
            </Form>
          </template>
        );

        const form = new FormPageObject();

        assert
          .dom(form.field('givenName').$errors)
          .doesNotExist(
            'validation errors are not rendered before initial validation happens before form is filled in'
          );
        assert
          .dom(form.field('familyName').$errors)
          .doesNotExist(
            'validation errors are not rendered before initial validation happens before form is filled in'
          );

        await fillIn(form.field('givenName').$control, '123');

        assert
          .dom(form.field('givenName').$errors)
          .doesNotExist(
            'validation errors are not rendered before initial validation happens on submit'
          );
        assert
          .dom(form.field('familyName').$errors)
          .doesNotExist(
            'validation errors are not rendered before initial validation happens on submit'
          );

        await blur(form.field('givenName').$control);

        assert
          .dom(form.field('givenName').$errors)
          .doesNotExist(
            'validation errors are not rendered before initial validation happens on submit'
          );
        assert
          .dom(form.field('familyName').$errors)
          .doesNotExist(
            'validation errors are not rendered before initial validation happens on submit'
          );

        await form.submit();

        assert
          .dom(form.field('givenName').$errors)
          .exists({ count: 1 }, 'validation errors appear on submit when validation fails');
        assert
          .dom(form.field('familyName').$errors)
          .exists({ count: 1 }, 'validation errors appear on submit when validation fails');

        await fillIn(form.field('givenName').$control, 'Tony');

        assert
          .dom(form.field('givenName').$errors)
          .doesNotExist('validation errors disappear after successful revalidation on change');
        assert
          .dom(form.field('familyName').$errors)
          .exists(
            { count: 1 },
            'validation errors do not disappear until revalidation happens on change'
          );
      });
    });
  });
});
