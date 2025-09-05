import { PageObject, selector as sel } from 'fractal-page-object';

import { IconButtonPageObject } from './icon-button.ts';
import { NumberInputPageObject } from './input.ts';
import { SelectPageObject } from './select.ts';

import type { ElementLike } from 'fractal-page-object';

export class PaginationPageObject extends PageObject<HTMLDivElement> {
  static SELECTOR = '[data-test-pagination]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? PaginationPageObject.SELECTOR, parent, index);
  }

  $pageSize = sel(
    '[part="page-size"]',
    class extends PageObject<HTMLElement> {
      $select = sel(SelectPageObject.SELECTOR, SelectPageObject);
    }
  );

  $page = sel(
    '[part="page"]',
    class extends PageObject<HTMLElement> {
      $select = sel(SelectPageObject.SELECTOR, SelectPageObject);
      $input = sel(NumberInputPageObject.SELECTOR, NumberInputPageObject);
    }
  );

  $items = sel<HTMLElement>('[part="items"]');

  $prev = sel('[data-test-prev]', IconButtonPageObject);
  $next = sel('[data-test-next]', IconButtonPageObject);
}
