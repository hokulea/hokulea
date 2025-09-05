import { PageObject, selector as sel } from 'fractal-page-object';

import { PaginationPageObject } from './pagination.ts';

import type { ElementLike } from 'fractal-page-object';

export class DataTablePageObject extends PageObject<HTMLSpanElement> {
  static SELECTOR = '[data-test-data-table]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? DataTablePageObject.SELECTOR, parent, index);
  }

  $col = sel<HTMLTableCellElement>('thead th');
  $rows = sel<HTMLTableRowElement>('tbody tr');
  $paginationFooter = sel(
    '[data-pagination]',
    class extends PageObject<HTMLTableCellElement> {
      $pagination = sel(PaginationPageObject.SELECTOR, PaginationPageObject);
    }
  );
}
