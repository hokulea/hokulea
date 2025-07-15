import { PageObject, selector as sel } from 'fractal-page-object';

import type { ElementLike } from 'fractal-page-object';

export class OptionPageObject extends PageObject<HTMLDivElement> {
  $label = sel<HTMLLabelElement | HTMLLegendElement>('[data-test-label]');
  $description = sel<HTMLParagraphElement>('[data-test-description]');
  $control = sel<HTMLInputElement>('input');
}

export class ChoicesPageObject extends PageObject<HTMLDivElement | HTMLFieldSetElement> {
  static SELECTOR = '[data-test-choices]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? ChoicesPageObject.SELECTOR, parent, index);
  }

  $options = sel('[data-test-option]', OptionPageObject);

  option(value: string) {
    return this.$options.find(
      (option) => option.$control.element?.value === value
    ) as OptionPageObject;
  }
}
