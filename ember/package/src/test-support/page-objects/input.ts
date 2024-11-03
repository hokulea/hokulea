import { PageObject } from 'fractal-page-object';

import type { ElementLike } from 'fractal-page-object';

export interface Input extends PageObject {
  control: HTMLInputElement;
}

export class InputPageObject extends PageObject<HTMLInputElement> implements Input {
  static SELECTOR = '[data-test-input]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? InputPageObject.SELECTOR, parent, index);
  }

  get control() {
    return this.element as HTMLInputElement;
  }
}

export class RangeInputPageObject extends InputPageObject {
  get orientation(): string | undefined {
    return this.control.dataset.orientation;
  }
}
export const NumberInputPageObject = InputPageObject;
export const TextInputPageObject = InputPageObject;
export const PhoneInputPageObject = InputPageObject;
export const DateInputPageObject = InputPageObject;
export const EmailInputPageObject = InputPageObject;
export const PasswordInputPageObject = InputPageObject;
