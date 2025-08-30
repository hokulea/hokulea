import { PageObject, selector as sel } from 'fractal-page-object';

import { IconPageObject } from './icon.ts';

import type { ElementLike } from 'fractal-page-object';

export class NavLinkPageObject extends PageObject<
  HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement
> {
  static SELECTOR = '[part="item"]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? NavLinkPageObject.SELECTOR, parent, index);
  }

  $icon = sel(IconPageObject.SELECTOR, IconPageObject);
}
