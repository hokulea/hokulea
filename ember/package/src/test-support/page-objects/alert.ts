import { PageObject, selector as sel } from 'fractal-page-object';

import type { ElementLike } from 'fractal-page-object';

export class AlertPageObject extends PageObject<
  HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement
> {
  static SELECTOR = '[data-test-feedback]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? AlertPageObject.SELECTOR, parent, index);
  }

  get indicator(): string | null | undefined {
    return this.element?.getAttribute('data-indicator');
  }

  get importance(): string | null | undefined {
    return this.element?.getAttribute('data-importance');
  }

  $icon = sel<HTMLSpanElement>('[part="icon"]');
  $title = sel<HTMLSpanElement>('[part="title"]');
  $content = sel<HTMLSpanElement>('[part="content"]');
  $actions = sel<HTMLSpanElement>('[part="actions"]');
}
