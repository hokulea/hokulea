import { PageObject, selector as sel } from 'fractal-page-object';

import { ButtonPageObject } from './button.ts';

import type { ElementLike } from 'fractal-page-object';

export class ButtonGroupPageObject extends PageObject<HTMLDivElement> {
  static SELECTOR = '[data-test-button-group]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? ButtonGroupPageObject.SELECTOR, parent, index);
  }

  $button = sel(ButtonPageObject.SELECTOR, ButtonPageObject);
}
