import { render, rerender, waitFor } from '@ember/test-helpers';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '#src';
import { FormPageObject } from '#test-support';
import { testButNotOnCI } from '#tests/helpers.ts';

import type { FieldValidateCallback } from '#src';

module('Integration | <Form> | Async state', function (hooks) {
  setupRenderingTest(hooks);

  interface TestFormData {
    givenName?: string;
    familyName?: string;
  }

  const validateFieldCallbackSync: FieldValidateCallback<TestFormData> = (value, field) => {
    const errors = [];

    if (value == undefined) {
      errors.push({
        type: 'required',
        value,
        message: `${field} is required!`
      });
    } else {
      if (value.charAt(0).toUpperCase() !== value.charAt(0)) {
        errors.push({
          type: 'uppercase',
          value,
          message: `${field} must be upper case!`
        });
      }

      if (value.toLowerCase() === 'foo') {
        errors.push({
          type: 'notFoo',
          value,
          message: `Foo is an invalid ${field}!`
        });
      }
    }

    return errors.length > 0 ? errors : undefined;
  };

  const validateFieldCallbackAsync: FieldValidateCallback<TestFormData> = async (
    value,
    field,
    data
  ) => {
    // intentionally adding a delay here, to make the validation behave truly async and assert that we are correctly waiting for it in tests
    await new Promise((resolve) => setTimeout(resolve, 10));

    return validateFieldCallbackSync(value, field, data);
  };

  const stringify = (data: unknown) => JSON.stringify(data);

  module('validation', function () {
    // https://github.com/hokulea/hokulea/issues/361
    testButNotOnCI('validation state is yielded - valid', async function (assert) {
      const data: TestFormData = { givenName: 'Tony', familyName: 'Ward' };

      await render(
        <template>
          <Form @data={{data}} as |form|>
            <form.Text
              @name="givenName"
              @label="Given Name"
              @validate={{validateFieldCallbackAsync}}
            />

            {{#if form.validationState}}
              <div data-test-validation-state>{{form.validationState.state}}</div>
              {{#if form.validationState.isResolved}}
                <div data-test-validation-value>
                  {{stringify form.validationState.value}}
                </div>
              {{/if}}
            {{/if}}
          </Form>
        </template>
      );

      const form = new FormPageObject();

      assert
        .dom('[data-test-validation-state]')
        .doesNotExist('form.validationState is not present until first validation');

      const promise = form.submit();

      await waitFor('[data-test-validation-state]');

      assert
        .dom('[data-test-validation-state]')
        .hasText('PENDING', 'form.validationState is pending');

      await promise;
      await rerender();

      assert
        .dom('[data-test-validation-state]')
        .hasText('RESOLVED', 'form.validationState has resolved');
      assert
        .dom('[data-test-validation-value]')
        .hasText('{}', 'form.validationState.value has no errors');
    });

    // https://github.com/hokulea/hokulea/issues/361
    testButNotOnCI('validation state is yielded - invalid', async function (assert) {
      const data: TestFormData = { givenName: 'Foo', familyName: 'Smith' };

      await render(
        <template>
          <Form @data={{data}} as |form|>
            <form.Text
              @name="givenName"
              @label="Given Name"
              @validate={{validateFieldCallbackAsync}}
            />
            {{#if form.validationState}}
              <div data-test-validation-state>{{form.validationState.state}}</div>
              {{#if form.validationState.isResolved}}
                <div data-test-validation-value>
                  {{stringify form.validationState.value}}
                </div>
              {{/if}}
            {{/if}}
          </Form>
        </template>
      );

      const form = new FormPageObject();

      assert
        .dom('[data-test-validation-state]')
        .doesNotExist('form.validationState is not present until first validation');

      const promise = form.submit();

      await waitFor('[data-test-validation-state]');

      assert
        .dom('[data-test-validation-state]')
        .hasText('PENDING', 'form.validationState is pending');

      await promise;
      await rerender();

      assert
        .dom('[data-test-validation-state]')
        .hasText('RESOLVED', 'form.validationState has resolved');
      assert
        .dom('[data-test-validation-value]')
        .hasText(
          '{"givenName":[{"type":"notFoo","value":"Foo","message":"Foo is an invalid givenName!"}]}',
          'form.validationState.value has ErrorRecord'
        );
    });
  });

  module('submission', function () {
    // https://github.com/hokulea/hokulea/issues/361
    testButNotOnCI('submission state is yielded - resolved', async function (assert) {
      const data: TestFormData = { givenName: 'Tony', familyName: 'Ward' };
      const submitHandler = (): Promise<string> =>
        new Promise((resolve) => {
          setTimeout(() => resolve('SUCCESS'), 10);
        });

      await render(
        <template>
          <Form @data={{data}} @submit={{submitHandler}} as |form|>
            <form.Text @name="givenName" @label="Given Name" />
            {{#if form.submissionState}}
              <div data-test-submission-state>{{form.submissionState.state}}</div>
              {{#if form.submissionState.isResolved}}
                <div data-test-submission-value>
                  {{form.submissionState.value}}
                </div>
              {{/if}}
            {{/if}}
          </Form>
        </template>
      );

      const form = new FormPageObject();

      assert
        .dom('[data-test-submission-state]')
        .doesNotExist('form.submissionState is not present until first submission');

      const promise = form.submit();

      await waitFor('[data-test-submission-state]');

      assert
        .dom('[data-test-submission-state]')
        .hasText('PENDING', 'form.submissionState is pending');

      await promise;
      await rerender();

      assert
        .dom('[data-test-submission-state]')
        .hasText('RESOLVED', 'form.submissionState has resolved');
      assert
        .dom('[data-test-submission-value]')
        .hasText('SUCCESS', 'form.submissionState.value has value returned by @onSubmit action');
    });

    // https://github.com/hokulea/hokulea/issues/361
    testButNotOnCI('submission state is yielded - rejected', async function (assert) {
      const data: TestFormData = { givenName: 'Tony', familyName: 'Ward' };
      const submitHandler = (): Promise<string> =>
        new Promise((_resolve, reject) => {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          setTimeout(() => reject('ERROR'), 10);
        });

      await render(
        <template>
          <Form @data={{data}} @submit={{submitHandler}} as |form|>
            <form.Text @name="givenName" @label="Given Name" />
            {{#if form.submissionState}}
              <div data-test-submission-state>{{form.submissionState.state}}</div>
              {{#if form.submissionState.isRejected}}
                <div data-test-submission-error>
                  {{stringify form.submissionState.error}}
                </div>
              {{/if}}
            {{/if}}
          </Form>
        </template>
      );

      const form = new FormPageObject();

      assert
        .dom('[data-test-submission-state]')
        .doesNotExist('form.submissionState is not present until first submission');

      const promise = form.submit();

      await waitFor('[data-test-submission-state]');

      assert
        .dom('[data-test-submission-state]')
        .hasText('PENDING', 'form.submissionState is pending');

      await promise;
      await rerender();

      assert
        .dom('[data-test-submission-state]')
        .hasText('REJECTED', 'form.submissionState has rejected');
      assert
        .dom('[data-test-submission-error]')
        .hasText('"ERROR"', 'form.submissionState.error has error returned by @onSubmit action');
    });

    // https://github.com/hokulea/hokulea/issues/361
    testButNotOnCI('validation and submission are sequential', async function (assert) {
      const data: TestFormData = { givenName: 'Tony', familyName: 'Ward' };
      const submitHandler = (): Promise<string> =>
        new Promise((resolve) => {
          setTimeout(() => resolve('SUCCESS'), 10);
        });

      await render(
        <template>
          <Form @data={{data}} @submit={{submitHandler}} as |form|>
            <form.Text
              @name="givenName"
              @label="Given Name"
              @validate={{validateFieldCallbackAsync}}
            />
            {{#if form.validationState}}
              <div data-test-validation-state>{{form.validationState.state}}</div>
            {{/if}}
            {{#if form.submissionState}}
              <div data-test-submission-state>{{form.submissionState.state}}</div>
            {{/if}}
          </Form>
        </template>
      );

      const form = new FormPageObject();

      const promise = form.submit();

      await waitFor('[data-test-validation-state]');

      assert
        .dom('[data-test-validation-state]')
        .hasText('PENDING', 'form.validationState is pending');
      assert
        .dom('[data-test-submission-state]')
        .doesNotExist('form.submissionStatenis not present until validation has finished');

      await waitFor('[data-test-submission-state]');

      assert
        .dom('[data-test-validation-state]')
        .hasText('RESOLVED', 'form.validationState is resolved');
      assert
        .dom('[data-test-submission-state]')
        .hasText('PENDING', 'form.submissionState is pending');

      await promise;
      await rerender();

      assert
        .dom('[data-test-validation-state]')
        .hasText('RESOLVED', 'form.validationState is still resolved');
      assert
        .dom('[data-test-submission-state]')
        .hasText('RESOLVED', 'form.submissionState has resolved');
    });
  });
});
