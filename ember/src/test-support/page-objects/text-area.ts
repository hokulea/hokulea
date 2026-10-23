import { PageObject } from 'fractal-page-object';

import type { Input } from './input.ts';
import type { ElementLike } from 'fractal-page-object';

export class TextAreaPageObject extends PageObject<HTMLInputElement> implements Input {
  static SELECTOR = '[data-test-textarea]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? TextAreaPageObject.SELECTOR, parent, index);
  }

  get control() {
    return this.element as HTMLInputElement;
  }
}
