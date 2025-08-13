import { page, userEvent } from '@vitest/browser/context';
import * as v from 'valibot';
import { expect, test, vi } from 'vitest';

import { createForm } from '#src';

import type { ValidationResultFailure } from '#src/definitions';

test('custom field validation: success', async () => {
  const form = createForm();

  const email = form.createField({
    name: 'email',
    value: 'localhost@domain',
    validate: ({ value }) => (value?.includes('@') ? undefined : 'Email must include an @ sign')
  });

  const result = await email.validate();

  expect(result.success).toBeTruthy();
  expect(result.value).toStrictEqual('localhost@domain');
});

test('custom field validation: fail', async () => {
  const form = createForm();

  const email = form.createField({
    name: 'email',
    validate: ({ value }) => (value ? undefined : 'Please enter an email')
  });
  const result = (await email.validate()) as ValidationResultFailure;

  expect(result.success).toBeFalsy();
  expect(result.issues[0].path).toMatchObject(['email']);
  expect(result.issues[0].message).toStrictEqual('Please enter an email');

  expect(email.issues).toMatchObject(result.issues);
});

test('schema field validation: success', async () => {
  const form = createForm();

  const email = form.createField({
    name: 'email',
    value: 'localhost@domain.tld',
    validate: v.pipe(v.string(), v.email())
  });
  const result = await email.validate();

  expect(result.success).toBeTruthy();
  expect(result.value).toStrictEqual('localhost@domain.tld');
});

test('schema field validation: fail', async () => {
  const form = createForm();

  const email = form.createField({
    name: 'email',
    value: 'localhost@domain',
    validate: v.pipe(v.string(), v.email())
  });
  const result = (await email.validate()) as ValidationResultFailure;

  expect(result.success).toBeFalsy();
  expect(result.issues[0].path).toMatchObject(['email']);
  expect(result.issues[0].message).toStrictEqual('Invalid email: Received "localhost@domain"');

  expect(email.issues).toMatchObject(result.issues);
});

test('validation and revalidation', async () => {
  const screen = await page.render(`
    <form novalidate data-testid="form">
      <input type="email" name="email">
    </form>
  `);

  const formElement = screen.getByTestId('form').element() as HTMLFormElement;
  const fieldElement = screen.q('[type="email"]').element() as HTMLInputElement;

  const form = createForm({
    element: formElement
  });

  const validationHandler = vi.fn();

  const email = form.createField({
    name: 'email',
    element: fieldElement,
    ignoreNativeValidation: true,
    validateOn: 'change',
    validate: ({ value }) => (value ? undefined : 'Please enter an email'),
    validated: validationHandler
  });

  expect(email.validated).toBeFalsy();

  // formElement.dispatchEvent(new SubmitEvent('submit'));
  await userEvent.fill(fieldElement, 'foo');
  await userEvent.tab(); // trigger the change event

  await vi.waitUntil(() => expect(email.validated).toBeTruthy());
  await vi.waitUntil(() =>
    expect(validationHandler).toBeCalledWith('change', {
      success: false,
      value: undefined,
      issues: [
        {
          path: ['email'],
          message: 'Please enter an email'
        }
      ]
    })
  );

  await userEvent.fill(fieldElement, 'bar');
  await userEvent.tab(); // trigger the change event

  await vi.waitUntil(() =>
    expect(validationHandler).toBeCalledWith('change', {
      success: false,
      value: undefined,
      issues: [
        {
          path: ['email'],
          message: 'Please enter an email'
        }
      ]
    })
  );
});
