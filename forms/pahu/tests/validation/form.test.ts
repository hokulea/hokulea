import * as v from 'valibot';
import { describe, expect, test } from 'vitest';

import { createForm } from '#src';

import type { Issue, ValidationResultFailure } from '#src/definitions';

test('custom form validation: success', async () => {
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
    }
  });

  form.createField({
    name: 'email',
    value: 'localhost@domain'
  });

  const result = await form.validate();

  expect(result.success).toBeTruthy();
  expect(result.value).toMatchObject({ email: 'localhost@domain' });
});

test('custom form validation: fail', async () => {
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
    }
  });

  const email = form.createField({
    name: 'email'
  });

  const result = (await form.validate()) as ValidationResultFailure;

  expect(result.success).toBeFalsy();
  expect(result.issues[0].path).toMatchObject(['email']);
  expect(result.issues[0].message).toStrictEqual('Please enter an email');

  expect(email.issues).toMatchObject(result.issues);
});

test('custom form + field validation: success', async () => {
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
    }
  });

  form.createField({
    name: 'email',
    value: 'localhost@domain',
    validate: ({ value }) => (value?.includes('@') ? undefined : 'Email must include an @ sign')
  });

  const result = await form.validate();

  expect(result.success).toBeTruthy();
  expect(result.value).toMatchObject({ email: 'localhost@domain' });
});

test('custom form + field validation: fail', async () => {
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
    }
  });

  form.createField({
    name: 'email',
    validate: ({ value }) =>
      typeof value === 'string' && value.includes('@') ? undefined : 'Email must include an @ sign'
  });

  const result = (await form.validate()) as ValidationResultFailure;

  expect(result.success).toBeFalsy();
  expect(result.issues[0]).toMatchObject({ path: ['email'], message: 'Please enter an email' });
  expect(result.issues[1]).toMatchObject({
    path: ['email'],
    message: 'Email must include an @ sign'
  });
});

test('schema form validation: success', async () => {
  const form = createForm({
    validate: v.required(
      v.object({
        email: v.pipe(v.string(), v.email()),
        age: v.pipe(v.number())
      }),
      ['email', 'age']
    )
  });

  form.createField({
    name: 'email',
    value: 'localhost@domain.tld'
  });
  form.createField({
    name: 'age',
    value: 42
  });

  const result = await form.validate();

  expect(result.success).toBeTruthy();
  expect(result.value).toMatchObject({ email: 'localhost@domain.tld', age: 42 });
});

describe('schema form validation: fail', () => {
  const form = createForm({
    validate: v.required(
      v.object({
        email: v.pipe(v.string(), v.email()),
        age: v.pipe(v.number())
      }),
      ['email', 'age']
    )
  });

  const email = form.createField({
    name: 'email'
  });
  const age = form.createField({
    name: 'age'
  });

  test('check for required fields', async () => {
    const result = (await form.validate()) as ValidationResultFailure;

    expect(result.success).toBeFalsy();
    expect(result.issues[0]).toMatchObject({
      path: ['email'],
      message: 'Invalid type: Expected !undefined but received undefined'
    });
    expect(result.issues[1]).toMatchObject({
      path: ['age'],
      message: 'Invalid type: Expected !undefined but received undefined'
    });
  });

  test('check for expected formats', async () => {
    email.setValue('localhost@domain');
    age.setValue('42');

    const result = (await form.validate()) as ValidationResultFailure;

    expect(result.success).toBeFalsy();
    expect(result.issues[0]).toMatchObject({
      path: ['email'],
      message: 'Invalid email: Received "localhost@domain"'
    });
    expect(result.issues[1]).toMatchObject({
      path: ['age'],
      message: 'Invalid type: Expected number but received "42"'
    });
  });
});
