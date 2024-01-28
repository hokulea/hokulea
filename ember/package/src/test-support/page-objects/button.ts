import { click } from '@ember/test-helpers';

import { PageObject, selector as sel } from 'fractal-page-object';

import type { ElementLike, GenericPageObject } from 'fractal-page-object/dist/-private/types';

export class ButtonPageObject extends PageObject<
  HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement
> {
  static SELECTOR = '[data-test-button]';

  constructor(
    selector?: string,
    parent?: GenericPageObject | ElementLike | null,
    index?: number | null
  ) {
    super(selector ?? ButtonPageObject.SELECTOR, parent, index);
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

  $before = sel<HTMLSpanElement>('[data-test-button="before"]');
  $label = sel<HTMLSpanElement>('[data-test-button="label"]');
  $after = sel<HTMLSpanElement>('[data-test-button="after"]');

  async push() {
    if (this.element) {
      await click(this.element);
    }
  }
}
