import { PageObject, selector as sel } from 'fractal-page-object';

import { NavLinkPageObject } from './-navigation.ts';

import type { ElementLike } from 'fractal-page-object';

export class TabNavPageObject extends PageObject<HTMLElement> {
  static SELECTOR = '[data-test-tab-nav]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? TabNavPageObject.SELECTOR, parent, index);
  }

  $items = sel('[part="item"]', NavLinkPageObject);
}
