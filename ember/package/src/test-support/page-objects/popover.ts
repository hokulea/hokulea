import { PageObject } from 'fractal-page-object';

import type { ElementLike } from 'fractal-page-object';

export class PopoverPageObject extends PageObject<
  HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement
> {
  static SELECTOR = '[data-test-popover]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? PopoverPageObject.SELECTOR, parent, index);
  }
}
