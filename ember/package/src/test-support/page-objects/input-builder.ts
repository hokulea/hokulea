import { PageObject, selector as sel } from 'fractal-page-object';

import { InputPageObject } from './input';

import type { Input } from './input';
import type { ElementLike, GenericPageObject } from 'fractal-page-object/dist/-private/types';

export class InputBuilderPageObject extends PageObject<HTMLInputElement> implements Input {
  static SELECTOR = '[data-test-input-builder]';

  constructor(
    selector?: string,
    parent?: GenericPageObject | ElementLike | null,
    index?: number | null
  ) {
    super(selector ?? InputBuilderPageObject.SELECTOR, parent, index);
  }

  $prefix = sel<HTMLSpanElement>('[data-test-input-builder="prefix"]');
  $affix = sel<HTMLSpanElement>('[data-test-input-builder="affix"]');
  $suffix = sel<HTMLSpanElement>('[data-test-input-builder="suffix"]');
  $input = sel(InputPageObject.SELECTOR, InputPageObject);

  get control() {
    return this.$input.element as HTMLInputElement;
  }
}

export const CurrencyInputPageObject = InputBuilderPageObject;
