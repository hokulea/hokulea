import { page } from '@vitest/browser/context';
import { expect, test } from 'vitest';

import { createForm } from '#src';

import type { ValidationResultFailure } from '#src/definitions';

test('native validation: success', async () => {
  const screen = page.render(`
    <form novalidate data-testid="form">
      <input type="email" name="email">
      <input type="number" name="age">
    </form>
  `);

  const form = createForm({
    element: screen.getByTestId('form').element() as HTMLFormElement
  });

  const result = await form.validate();

  expect(result.success).toBeTruthy();
  expect(result.value).toStrictEqual({ email: '', age: '' });
});

test('native validation: fail', async () => {
  const screen = page.render(`
    <form novalidate data-testid="form">
      <input type="email" name="email" value="localhost">
      <input type="number" name="age" required>
    </form>
  `);

  const form = createForm({
    element: screen.getByTestId('form').element() as HTMLFormElement
  });

  const result = (await form.validate()) as ValidationResultFailure;

  expect(result.success).toBeFalsy();
  expect(result.issues[0]).toMatchObject({ path: ['email'] });
  expect(result.issues[1]).toMatchObject({ path: ['age'] });
});

test('native validation with registered field: success', async () => {
  const screen = page.render(`
    <form novalidate data-testid="form">
      <input type="email" name="email">
      <input type="number" name="age">
    </form>
  `);

  const form = createForm({
    element: screen.getByTestId('form').element() as HTMLFormElement
  });

  form.createField({
    name: 'email',
    element: screen.q('[type="email"]').element() as HTMLInputElement
  });
  form.createField({
    name: 'age',
    element: screen.q('[type="number"]').element() as HTMLInputElement
  });

  const result = await form.validate();

  expect(result.success).toBeTruthy();
  expect(result.value).toStrictEqual({ email: undefined, age: undefined });
});

test('native validation with registered field: fail', async () => {
  const screen = page.render(`
    <form novalidate data-testid="form">
      <input type="email" name="email" value="localhost">
      <input type="number" name="age" required>
    </form>
  `);

  const form = createForm({
    element: screen.getByTestId('form').element() as HTMLFormElement
  });

  form.createField({
    name: 'email',
    element: screen.q('[type="email"]').element() as HTMLInputElement
  });
  form.createField({
    name: 'age',
    element: screen.q('[type="number"]').element() as HTMLInputElement
  });

  const result = (await form.validate()) as ValidationResultFailure;

  expect(result.success).toBeFalsy();
  expect(result.issues[0]).toMatchObject({ path: ['email'] });
  expect(result.issues[1]).toMatchObject({ path: ['age'] });
});

test('register on non-validity element does not break native validation', async () => {
  const screen = page.render(`
    <form novalidate data-testid="form">
      <div role="listbox">
      </div>
    </form>
  `);

  // const validationHandler = vi.fn();
  const form = createForm();
  const fieldElement = screen.getByRole('listbox').element() as HTMLFieldSetElement;

  form.createField({
    name: 'options',
    element: fieldElement
  });

  const result = await form.validate();

  expect(result.success).toBeTruthy();
});

test('input[type=radio] with the same name only emit one issue', async () => {
  const screen = page.render(`
    <form novalidate data-testid="form">
      <fieldset>
        <input type="radio" name="pokemon" value="Bulbsaur" required>
        <input type="radio" name="pokemon" value="Squirtle">
        <input type="radio" name="pokemon" value="Charmander">
      </fieldset>
    </form>
  `);

  const form = createForm();

  const pkmn = form.createField({
    name: 'pokemon'
  });

  pkmn.subtle.registerElement(
    screen.q('input[type=radio]:nth-child(1)').element() as HTMLInputElement
  );
  pkmn.subtle.registerElement(
    screen.q('input[type=radio]:nth-child(2)').element() as HTMLInputElement
  );
  pkmn.subtle.registerElement(
    screen.q('input[type=radio]:nth-child(3)').element() as HTMLInputElement
  );

  const result = (await form.validate()) as ValidationResultFailure;

  expect(result.success).toBeFalsy();
  expect(result.issues.length).toBe(1);
});
