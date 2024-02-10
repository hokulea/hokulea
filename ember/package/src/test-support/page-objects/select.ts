import { settled } from '@ember/test-helpers';

import { PageObject, selector as sel } from 'fractal-page-object';

import type { ElementLike, GenericPageObject } from 'fractal-page-object/dist/-private/types';

type SelectOptions = {
  keepPreviouslySelected: boolean;
};

export class SelectPageObject extends PageObject<HTMLSelectElement> {
  static SELECTOR = '[data-test-select]';

  constructor(
    selector?: string,
    parent?: GenericPageObject | ElementLike | null,
    index?: number | null
  ) {
    super(selector ?? SelectPageObject.SELECTOR, parent, index);
  }

  get control() {
    return this.element as HTMLSelectElement;
  }

  $option = sel<HTMLOptionElement>('option');

  async select(value: unknown | unknown[], options?: SelectOptions) {
    const items = Array.isArray(value) ? value : [value];
    const keepPreviouslySelected = options?.keepPreviouslySelected ?? false;

    for (const option of this.$option.elements) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (items.includes(option.hokuleaItem)) {
        option.selected = true;
      } else if (!keepPreviouslySelected) {
        option.selected = false;
      }
    }

    const event = new Event('input');

    this.control.dispatchEvent(event);

    await settled();
  }
}
