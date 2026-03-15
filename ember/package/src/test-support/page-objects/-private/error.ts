import { PageObject } from 'fractal-page-object';

export class Error extends PageObject<HTMLDivElement> {
  static SELECTOR = '[data-test-error]';

  get type() {
    return this.element?.dataset.testErrorType;
  }

  get value() {
    return this.element?.dataset.testErrorValue;
  }
}
