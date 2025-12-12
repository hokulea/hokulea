import { PageObject } from 'fractal-page-object';

export class Error extends PageObject<HTMLDivElement> {
  static SELECTOR = '[data-test-error]';

  get type() {
    return this.element?.getAttribute('data-test-error-type');
  }

  get value() {
    return this.element?.getAttribute('data-test-error-value');
  }
}
