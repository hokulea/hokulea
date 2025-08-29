import { PageObject, selector as sel } from 'fractal-page-object';

import type { ElementLike } from 'fractal-page-object';

export class PagePageObject extends PageObject<
  HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement
> {
  static SELECTOR = '[data-test-page]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? PagePageObject.SELECTOR, parent, index);
  }

  $header = sel<HTMLElement>('header');

  $title = sel<HTMLHeadingElement>('header > h1');
  $description = sel<HTMLParagraphElement>('header > p');

  $content = sel<HTMLElement>('[part="content"]');
}

export class SectionedPagePageObject extends PagePageObject {
  $nav = sel<HTMLElement>('header > nav');
}
