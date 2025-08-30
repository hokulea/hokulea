import { PageObject, selector as sel } from 'fractal-page-object';

import { NavLinkPageObject } from './-navigation';

import type { ElementLike } from 'fractal-page-object';

export class NavigationListPageObject extends PageObject<HTMLDivElement> {
  static SELECTOR = '[data-test-navigation-list]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? NavigationListPageObject.SELECTOR, parent, index);
  }

  $items = sel('[part="item"]', NavLinkPageObject);
  $titles = sel<HTMLElement>('[part="title"]');
}
