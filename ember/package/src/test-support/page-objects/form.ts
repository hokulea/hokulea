import { triggerEvent } from '@ember/test-helpers';

import { PageObject, selector as sel } from 'fractal-page-object';

import { Error } from './-private/error.ts';
import { FieldPageObject } from './-private/field.ts';
import { ButtonPageObject } from './button.ts';

import type { ElementLike } from 'fractal-page-object';

export type { OptionPageObject } from './-private/choices.ts';

export class FormPageObject extends PageObject<HTMLFormElement> {
  static SELECTOR = '[data-test-form]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? FormPageObject.SELECTOR, parent, index);
  }

  $submit = sel('button[type="submit"]', ButtonPageObject);
  $reset = sel('button[type="reset"]', ButtonPageObject);

  $fields = sel(FieldPageObject.SELECTOR, FieldPageObject);
  $errors = sel(Error.SELECTOR, Error);

  field(name: string) {
    return this.$fields.find((field) => field.name === name) as FieldPageObject;
  }

  async submit() {
    await triggerEvent(this.element as HTMLFormElement, 'submit');
  }

  async reset() {
    await triggerEvent(this.element as HTMLFormElement, 'reset');
  }
}
