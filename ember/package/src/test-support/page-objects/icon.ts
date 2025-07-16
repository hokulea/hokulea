import { PageObject, selector as sel } from 'fractal-page-object';

import type { ElementLike } from 'fractal-page-object';

export class IconPageObject extends PageObject<HTMLSpanElement> {
  static SELECTOR = '[data-test-icon]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? IconPageObject.SELECTOR, parent, index);
  }

  $svg = sel<SVGSVGElement>('svg');
  // $svg = sel<HTMLElement>('svg');
}
