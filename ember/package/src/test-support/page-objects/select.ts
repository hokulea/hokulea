import { select } from '@ember/test-helpers';

import { PageObject, selector as sel } from 'fractal-page-object';

import type { Target } from '@ember/test-helpers';
import type { ElementLike } from 'fractal-page-object';

export class SelectPageObject extends PageObject<HTMLSelectElement> {
  static SELECTOR = '[data-test-select]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? SelectPageObject.SELECTOR, parent, index);
  }

  get spacing(): string | null | undefined {
    return this.element?.getAttribute('data-spacing');
  }

  get control() {
    return this.element as HTMLSelectElement;
  }

  $option = sel<HTMLOptionElement>('option');

  async select(options: string | string[], keepPreviouslySelected?: boolean) {
    await select(this.element as Target, options, keepPreviouslySelected);
  }
}
