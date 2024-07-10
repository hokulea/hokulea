import { PageObject } from 'fractal-page-object';

import type { Input } from './input';
import type { ElementLike } from 'fractal-page-object';

class ChoicePageObject extends PageObject<HTMLInputElement> implements Input {
  static SELECTOR = '[data-test-choice]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? ChoicePageObject.SELECTOR, parent, index);
  }

  get control() {
    return this.element as HTMLInputElement;
  }
}

export const RadioPageObject = ChoicePageObject;
export const CheckboxPageObject = ChoicePageObject;
