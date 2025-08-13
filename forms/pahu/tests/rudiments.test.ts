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
  await page.render('<form novalidate data-testid="f">...</form>');

  const element = page.getByTestId('f').element() as HTMLFormElement;

  const submitHandler = vi.fn();

  createForm({ element, submit: submitHandler });

  element.dispatchEvent(new SubmitEvent('submit'));

  await vi.waitFor(() => {
    expect(submitHandler).toHaveBeenCalled();
  });
});
