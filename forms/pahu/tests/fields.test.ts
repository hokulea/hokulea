import { expect, test } from 'vitest';

import { createForm } from '#src';

test('field can be added with name', () => {
  const form = createForm();
  const givenName = form.createField({ name: 'givenName' });

  expect(givenName.name).toBe('givenName');
  expect(givenName.ignoreNativeValidation).toBeFalsy();
});
