import { PageObject, selector as sel } from 'fractal-page-object';

import type { ElementLike } from 'fractal-page-object';

export class RadioButtonGroupPageObject extends PageObject<HTMLDivElement> {
  static SELECTOR = '[role="radiogroup"]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? RadioButtonGroupPageObject.SELECTOR, parent, index);
  }

  $option = sel(
    '[role="radio"]',
    class extends PageObject<HTMLButtonElement> {
      get checked() {
        return this.element?.getAttribute('aria-checked');
      }
    }
  );
}
