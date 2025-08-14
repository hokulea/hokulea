import { page, userEvent } from '@vitest/browser/context';
import { describe, expect, test, vi } from 'vitest';

import { createForm } from '#src';

test('field can be added with name', () => {
  const form = createForm();
  const givenName = form.createField({ name: 'givenName' });

  expect(givenName.name).toBe('givenName');
  expect(givenName.ignoreNativeValidation).toBeFalsy();
});

test('cannot add another field with an existing name', () => {
  const form = createForm();

  form.createField({ name: 'givenName' });

  expect(() => form.createField({ name: 'givenName' })).toThrowError(
    `Cannot register Field. Field with name 'givenName' already exists`
  );
});

test('getting field', () => {
  const form = createForm();
  const givenName = form.createField({ name: 'givenName', value: 'John' });

  expect(form.getFieldValue('givenName')).toBe('John');
  expect(form.getFieldValue('does-notrexist')).toBeUndefined();
});

test('field removal', async () => {
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
    validateOn: 'change',
    ignoreNativeValidation: true,
    validate: ({ value }) => (value ? undefined : 'Please enter an email'),
    validated: validationHandler
  });

  await userEvent.fill(fieldElement, 'foo');
  await userEvent.tab(); // trigger the change event

  await vi.waitUntil(() => expect(validationHandler).toBeCalled());

  validationHandler.mockClear();

  form.removeField(email);

  await userEvent.fill(fieldElement, 'bar');
  await userEvent.tab(); // trigger the change event

  await vi.waitUntil(() => expect(validationHandler).not.toBeCalled());
});

test('re-registerElement()', async () => {
  const screen = await page.render(`
    <form novalidate data-testid="form">
      <input type="email" name="email" data-testid="email">
      <input type="email" name="email2" data-testid="email2">
    </form>
  `);

  const validationHandler = vi.fn();
  const form = createForm();
  const fieldElement = screen.getByTestId('email').element() as HTMLInputElement;

  const email = form.createField({
    name: 'email',
    element: fieldElement,
    validateOn: 'change',
    ignoreNativeValidation: true,
    validate: ({ value }) => (value ? undefined : 'Please enter an email'),
    validated: validationHandler
  });

  await userEvent.fill(fieldElement, 'foo');
  await userEvent.tab(); // trigger the change event

  await vi.waitUntil(() => expect(validationHandler).toBeCalled());

  validationHandler.mockClear();

  email.registerElement(screen.getByTestId('email2').element() as HTMLInputElement);

  await userEvent.fill(fieldElement, 'bar');
  await userEvent.tab(); // trigger the change event

  await vi.waitUntil(() => expect(validationHandler).not.toBeCalled());
});

describe('Linked fields', () => {
  test('validation triggers', async () => {
    const form = createForm();

    const validationHandler = vi.fn();
    const password = form.createField({ name: 'password', value: 'test123' });

    form.createField({
      name: 'confirm_password',
      linkedField: 'password',
      value: 'test123',
      // eslint-disable-next-line @typescript-eslint/no-shadow
      validate: ({ value, form }) => {
        return value === form.getFieldValue('password') ? undefined : 'Passwords must match';
      },
      validated: validationHandler
    });

    password.setValue('test1234');

    await vi.waitFor(() =>
      expect(validationHandler).toBeCalledWith('link', {
        success: false,
        value: 'test123',
        issues: [
          {
            path: ['confirm_password'],
            message: 'Passwords must match'
          }
        ]
      })
    );
  });

  test('cleanup handlers', async () => {
    const form = createForm();

    const validationHandler = vi.fn();
    const email = form.createField({ name: 'email', value: 'localhost@domain' });
    const password = form.createField({ name: 'password', value: 'test123' });

    const confirmPassword = form.createField({
      name: 'confirm_password',
      linkedField: 'email',
      value: 'test123',
      // eslint-disable-next-line @typescript-eslint/no-shadow
      validate: ({ value, form }) => {
        return value === form.getFieldValue('email') ? undefined : 'Passwords must match';
      },
      validated: validationHandler
    });

    email.setValue('test1234');

    await vi.waitFor(() =>
      expect(validationHandler).toBeCalledWith('link', {
        success: false,
        value: 'test123',
        issues: [
          {
            path: ['confirm_password'],
            message: 'Passwords must match'
          }
        ]
      })
    );

    validationHandler.mockClear();
    confirmPassword.updateConfig({linkedField: 'password'});

    email.setValue('test1234');
    await vi.waitFor(() => expect(validationHandler).not.toHaveBeenCalled());

    expect(() => form.removeField(confirmPassword)).not.toThrow();
  });
});
