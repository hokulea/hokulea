import { PageObject } from 'fractal-page-object';

import type { ElementLike, GenericPageObject } from 'fractal-page-object/dist/-private/types';

export interface Input extends GenericPageObject {
  control: HTMLInputElement;
}

export class InputPageObject extends PageObject<HTMLInputElement> implements Input {
  static SELECTOR = '[data-test-input]';

  constructor(
    selector?: string,
    parent?: GenericPageObject | ElementLike | null,
    index?: number | null
  ) {
    super(selector ?? InputPageObject.SELECTOR, parent, index);
  }

  get control() {
    return this.element as HTMLInputElement;
  }
}

export const NumberInputPageObject = InputPageObject;
export const TextInputPageObject = InputPageObject;
export const PhoneInputPageObject = InputPageObject;
export const DateInputPageObject = InputPageObject;
export const EmailInputPageObject = InputPageObject;
export const PasswordInputPageObject = InputPageObject;
