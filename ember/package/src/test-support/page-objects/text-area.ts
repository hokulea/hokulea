import { PageObject } from 'fractal-page-object';

import type { Input } from './input';
import type { ElementLike, GenericPageObject } from 'fractal-page-object/dist/-private/types';

export class TextAreaPageObject extends PageObject<HTMLInputElement> implements Input {
  static SELECTOR = '[data-test-textarea]';

  constructor(
    selector?: string,
    parent?: GenericPageObject | ElementLike | null,
    index?: number | null
  ) {
    super(selector ?? TextAreaPageObject.SELECTOR, parent, index);
  }

  get control() {
    return this.element as HTMLInputElement;
  }
}
