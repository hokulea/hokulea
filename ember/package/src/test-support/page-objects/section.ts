import { PageObject, selector as sel } from 'fractal-page-object';

import type { GenericPageObject } from 'fractal-page-object/dist/-private/types';

export class SectionPageObject extends PageObject<
  HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement
> {
  static SELECTOR = '[data-test-section]';

  constructor(
    selector?: string,
    parent?: GenericPageObject | Element | null,
    index?: number | null
  ) {
    super(selector ?? SectionPageObject.SELECTOR, parent, index);
  }

  $header = sel('[data-test-section="header"]');
  $title = sel('[data-test-section="title"]');
}
