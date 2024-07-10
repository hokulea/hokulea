import { PageObject, selector as sel } from 'fractal-page-object';

import { selectListbox } from 'ember-aria-navigator/test-support';

import type { Target } from '@ember/test-helpers';
import type { ElementLike } from 'fractal-page-object';

export class ListPageObject extends PageObject<HTMLDivElement> {
  static SELECTOR = '[data-test-list]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? ListPageObject.SELECTOR, parent, index);
  }

  get control() {
    return this.element as HTMLDivElement;
  }

  $option = sel<HTMLOptionElement>('[role="option"]');

  async select(options: string | string[]) {
    await selectListbox(this.element as Target, options);
  }
}
