import { page, userEvent } from '@vitest/browser/context';
import { expect, test, vi } from 'vitest';

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
