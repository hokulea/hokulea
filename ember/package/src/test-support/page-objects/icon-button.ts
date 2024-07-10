import { click } from '@ember/test-helpers';

import { PageObject, selector as sel } from 'fractal-page-object';

import { IconPageObject } from './icon';

import type { ElementLike } from 'fractal-page-object';

export class IconButtonPageObject extends PageObject<
  HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement
> {
  static SELECTOR = '[data-test-icon-button]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? IconButtonPageObject.SELECTOR, parent, index);
  }

  get intent(): string | null | undefined {
    return this.element?.getAttribute('data-intent');
  }

  get importance(): string | null | undefined {
    return this.element?.getAttribute('data-importance');
  }

  get spacing(): string | null | undefined {
    return this.element?.getAttribute('data-spacing');
  }

  async push() {
    if (this.element) {
      await click(this.element);
    }
  }

  $icon = sel('[data-test-icon-button="icon"]', IconPageObject);
}
