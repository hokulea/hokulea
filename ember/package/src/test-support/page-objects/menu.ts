import { PageObject, selector as sel } from 'fractal-page-object';

import type { ElementLike, GenericPageObject } from 'fractal-page-object/dist/-private/types';

export class MenuPageObject extends PageObject<HTMLDivElement> {
  static SELECTOR = '[data-test-menu]';

  constructor(
    selector?: string,
    parent?: GenericPageObject | ElementLike | null,
    index?: number | null
  ) {
    super(selector ?? MenuPageObject.SELECTOR, parent, index);
  }

  get control() {
    return this.element as HTMLDivElement;
  }

  $item = sel<HTMLButtonElement | HTMLAnchorElement>('> [role="menuitem"]');
}
