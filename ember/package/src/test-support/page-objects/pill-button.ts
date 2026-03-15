import { click } from '@ember/test-helpers';

import { PageObject, selector as sel } from 'fractal-page-object';

import type { ElementLike } from 'fractal-page-object';

export class PillButtonPageObject extends PageObject<
  HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement
> {
  static SELECTOR = '[data-test-pill-button]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? PillButtonPageObject.SELECTOR, parent, index);
  }

  get intent(): string | null | undefined {
    return this.element?.dataset.intent;
  }

  get importance(): string | null | undefined {
    return this.element?.dataset.importance;
  }

  get spacing(): string | null | undefined {
    return this.element?.dataset.spacing;
  }

  $before = sel<HTMLSpanElement>('[data-test-button="before"]');
  $label = sel<HTMLSpanElement>('[data-test-button="label"]');
  $after = sel<HTMLSpanElement>('[data-test-button="after"]');

  async push() {
    if (this.element) {
      await click(this.element);
    }
  }
}
