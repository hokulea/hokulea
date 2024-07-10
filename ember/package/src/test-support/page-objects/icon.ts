import { PageObject } from 'fractal-page-object';

import type { ElementLike } from 'fractal-page-object';

export class IconPageObject extends PageObject<HTMLSpanElement> {
  static SELECTOR = '[data-test-icon]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? IconPageObject.SELECTOR, parent, index);
  }

  get name(): string | null | undefined {
    return this.element?.getAttribute('data-test-icon');
  }
}
