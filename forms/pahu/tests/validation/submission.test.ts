import { expect, test, vi } from 'vitest';

import { createForm } from '#src';

import type { Issue } from '#src/definitions';

test('submit: success', async () => {
  const submitHandler = vi.fn();
  const validatedHandler = vi.fn();

  const form = createForm({
    validate: ({ data }) => {
      const issues: Issue[] = [];

      if (!data.email) {
        issues.push({
          path: ['email'],
          message: 'Please enter an email'
        });
      }

      if (issues.length > 0) {
        return issues;
      }

      return;
    },
    submit: submitHandler,
    validated: validatedHandler
  });

  form.createField({
    name: 'email',
    value: 'localhost@domain'
  });

  await form.submit();

  expect(form.invalid).toBeFalsy();
  expect(submitHandler).toBeCalledWith({ email: 'localhost@domain' });
  expect(validatedHandler).not.toBeCalled();
});

test('submit: fail', async () => {
  const submitHandler = vi.fn();
  const validatedHandler = vi.fn();

  const form = createForm({
    validate: ({ data }) => {
      const issues: Issue[] = [];

      if (!data.email) {
        issues.push({
          path: ['email'],
          message: 'Please enter an email'
        });
      }

      if (issues.length > 0) {
        return issues;
      }

      return;
    },
    submit: submitHandler,
    validated: validatedHandler
  });

  form.createField({
    name: 'email'
  });

  await form.submit();

  expect(form.invalid).toBeTruthy();
  expect(submitHandler).not.toBeCalled();
  expect(validatedHandler).toBeCalledWith('submit', {
    success: false,
    value: { email: undefined },
    issues: [
      {
        path: ['email'],
        message: 'Please enter an email'
      }
    ]
  });
});
