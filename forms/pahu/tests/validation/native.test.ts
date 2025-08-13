import { page } from '@vitest/browser/context';
import { expect, test } from 'vitest';

import { createForm } from '#src';

import type { ValidationResultFailure } from '#src/definitions';

test('native validation: success', async () => {
  await page.render(`
    <form novalidate data-testid="form">
      <input type="email" name="email">
      <input type="number" name="age">
    </form>
  `);

  const form = createForm({
    element: page.getByTestId('form').element() as HTMLFormElement
  });

  form.createField({
    name: 'email',
    element: page.q('[type="email"]').element() as HTMLInputElement
  });
  form.createField({
    name: 'age',
    element: page.q('[type="number"]').element() as HTMLInputElement
  });

  const result = await form.validate();

  expect(result.success).toBeTruthy();
  expect(result.value).toStrictEqual({ email: '', age: '' });
});

test('native validation: fail', async () => {
  await page.render(`
    <form novalidate data-testid="form">
      <input type="email" name="email" value="localhost">
      <input type="number" name="age" required>
    </form>
  `);

  const form = createForm({
    element: page.getByTestId('form').element() as HTMLFormElement
  });

  form.createField({
    name: 'email',
    element: page.q('[type="email"]').element() as HTMLInputElement
  });
  form.createField({
    name: 'age',
    element: page.q('[type="number"]').element() as HTMLInputElement
  });

  const result = (await form.validate()) as ValidationResultFailure;

  expect(result.success).toBeFalsy();
  expect(result.issues[0]).toMatchObject({ path: ['email'] });
  expect(result.issues[1]).toMatchObject({ path: ['age'] });
});
