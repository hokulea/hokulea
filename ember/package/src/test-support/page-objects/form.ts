import { triggerEvent } from '@ember/test-helpers';

import { PageObject, selector as sel } from 'fractal-page-object';

import { FieldPageObject } from './-private/field';
import { ButtonPageObject } from './button';

import type { ElementLike } from 'fractal-page-object';

export class FormPageObject extends PageObject<HTMLFormElement> {
  static SELECTOR = '[data-test-form]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? FormPageObject.SELECTOR, parent, index);
  }

  $submit = sel('button[type="submit"]', ButtonPageObject);
  $reset = sel('button[type="reset"]', ButtonPageObject);

  $fields = sel(FieldPageObject.SELECTOR, FieldPageObject);

  field(name: string) {
    return this.$fields.find((field) => field.name === name);
  }

  async submit() {
    await triggerEvent(this.element as HTMLFormElement, 'submit');
  }

  async reset() {
    await triggerEvent(this.element as HTMLFormElement, 'reset');
  }
}
