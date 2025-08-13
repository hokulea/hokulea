import { describe, expectTypeOf, test } from 'vitest';

import { createForm } from '#src';

describe('Field Value Types', () => {
  test('Defined on the field', () => {
    const form = createForm();
    const email = form.createField({ name: 'email', value: 'localhost@domain' });

    expectTypeOf(email.value).toEqualTypeOf<string | undefined>();

    const age = form.createField({ name: 'age', value: 1234 });

    expectTypeOf(age.value).toEqualTypeOf<number | undefined>();
  });

  test('Defined on the field, and data is present', () => {
    const form = createForm({ data: { givenName: '', familyName: '' } });
    const email = form.createField({ name: 'email', value: 'localhost@domain' });

    expectTypeOf(email.value).toEqualTypeOf<string | undefined>();

    const age = form.createField({ name: 'age', value: 1234 });

    expectTypeOf(age.value).toEqualTypeOf<number | undefined>();
  });

  test('Defined on the form in data', () => {
    const form = createForm({ data: { email: 'localhost@domain', age: 123 } });
    const email = form.createField({ name: 'email' });

    expectTypeOf(email.value).toEqualTypeOf<string | undefined>();

    const age = form.createField({ name: 'age' });

    expectTypeOf(age.value).toEqualTypeOf<number | undefined>();
  });
});

describe('Field Name Types', () => {
  test('Defined on the field', () => {
    const form = createForm();
    const email = form.createField({ name: 'email' });

    expectTypeOf(email.name).toEqualTypeOf<string>();
  });

  test('Defined on the field, and data is present', () => {
    const form = createForm({ data: { givenName: '', familyName: '' } });
    const email = form.createField({ name: 'email' });

    expectTypeOf(email.name).toEqualTypeOf<string>();
  });

  test('Defined on the form in data', () => {
    const form = createForm({ data: { email: 'localhost@domain', age: 123 } });
    const email = form.createField({ name: 'email' });

    expectTypeOf(email.name).toEqualTypeOf<'email'>();

    const age = form.createField({ name: 'age' });

    expectTypeOf(age.name).toEqualTypeOf<'age'>();
  });

  // how do I test this?
  test.skip('Name prop for createField() has suggestions as defined in data for form', () => {
    const form = createForm({ data: { email: 'localhost@domain', age: 123 } });

    // apparently this first param is a union with an intersection
    // my strategy:
    // - exclude the non-interesting part from the union
    // - check in the intersection if the name with the union keys is present
    //

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expectTypeOf(form.createField).parameter(0);
    // .exclude<FieldConfig<{ email: string; age: number }, string, unknown>>()
    // .toMatchObjectType<{ name: 'email' | 'age' }>();
  });
});
