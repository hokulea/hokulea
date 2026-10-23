import { PageObject, selector as sel } from 'fractal-page-object';

import type { ElementLike } from 'fractal-page-object';

export class AvatarPageObject extends PageObject<HTMLSpanElement> {
  static SELECTOR = '[data-test-avatar]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? AvatarPageObject.SELECTOR, parent, index);
  }

  $svg = sel<SVGSVGElement>('svg');
  $img = sel<HTMLImageElement>('img');
}
