import { page } from '@vitest/browser/context';
import { expect, test, vi } from 'vitest';

import { createForm } from '#src';

test('default options', () => {
  const form = createForm();

  expect(form.invalid).toBeFalsy();
  expect(form.fieldValidationEvent).toBeUndefined();
  expect(form.fieldRevalidationEvent).toBe('change');
  expect(form.ignoreNativeValidation).toBeFalsy();
});

test('registerElement()', async () => {
  const screen = await page.render('<form novalidate data-testid="f">...</form>');

  const element = screen.getByTestId('f').element() as HTMLFormElement;

  const submitHandler = vi.fn();

  createForm({ element, submit: submitHandler });

  element.dispatchEvent(new SubmitEvent('submit'));

  await vi.waitFor(() => expect(submitHandler).toHaveBeenCalled());
});

test('re-registerElement()', async () => {
  const screen = await page.render(`
    <form novalidate data-testid="a"></form>
    <form novalidate data-testid="b"></form>
  `);

  const element = screen.getByTestId('a').element() as HTMLFormElement;
  const submitHandler = vi.fn();
  const form = createForm({ element, submit: submitHandler });

  element.dispatchEvent(new SubmitEvent('submit'));

  await vi.waitFor(() => expect(submitHandler).toHaveBeenCalled());

  submitHandler.mockClear();

  form.registerElement(screen.getByTestId('b').element() as HTMLFormElement);

  element.dispatchEvent(new SubmitEvent('submit'));

  await vi.waitFor(() => expect(submitHandler).not.toHaveBeenCalled());
});
