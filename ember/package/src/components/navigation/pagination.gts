import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import styles from '@hokulea/core/navigation.module.css';

import { asNumber, gt, range } from '../../-private/helpers.ts';
import { IconButton } from '../actions/icon-button.gts';
import { NumberInput } from '../controls/number-input.gts';
import { Select } from '../controls/select.gts';
import { LABELS, NextIcon, PrevIcon } from './-pagination';

interface PaginationSignature {
  Element: HTMLElement;
  Args: {
    backwardLabel?: string;

    forwardLabel?: string;

    change?: (value: { page: number; pageSize: number }) => void;

    /**
     * The translatable text indicating the number of items per page.
     */
    itemsPerPageLabel?: string;
    /**
     * The function returning a translatable text showing where the current page is,
     * in a manner of the range of items.
     */
    itemRangeLabel?: (min: number, max: number, total: number) => string;
    itemLabel?: (min: number, max: number) => string;

    /**
     * The current page.
     */
    page?: number;

    /**
     * The number dictating how many items a page contains.
     */
    pageSize: number;

    /**
     * The choices for `pageSize`.
     */
    pageSizes?: number[] | { label: string; value: number }[];
    /**
     * The translatable text showing the current page.
     */
    pageLabel?: (page: number) => string;
    /**
     * A function returning PII showing where the current page is.
     */
    pageRangeLabel?: (total: number) => string;
    pageNumberLabel?: string;
    /**
     * The total number of items.
     */
    totalItems?: number;
  };
}

export class Pagination extends Component<PaginationSignature> {
  @tracked total = 0;

  get minItems() {
    return (this.page - 1) * this.args.pageSize + 1;
  }

  get maxItems() {
    return this.page * this.args.pageSize;
  }

  get pages(): number | undefined {
    if (this.args.totalItems) {
      return Math.ceil(this.args.totalItems / this.args.pageSize);
    }

    return undefined;
  }

  get page() {
    return this.args.page ?? 1;
  }

  get itemsPerPageLabel() {
    return this.args.itemsPerPageLabel ?? LABELS.itemPerPage;
  }

  get itemRangeLabel() {
    return (this.args.itemRangeLabel ?? LABELS.itemRange)(
      this.minItems,
      this.maxItems,
      this.args.totalItems ?? 1
    );
  }

  get itemLabel() {
    return (this.args.itemLabel ?? LABELS.item)(this.minItems, this.maxItems);
  }

  get pageLabel() {
    return (this.args.pageLabel ?? LABELS.page)(this.page);
  }

  get pageNumberLabel() {
    return this.args.pageNumberLabel ?? LABELS.pageNumber;
  }

  get pageRangeLabel() {
    return (this.args.pageRangeLabel ?? LABELS.pageRange)(this.pages ?? 0);
  }

  get pageSizeOptions() {
    return (this.args.pageSizes ?? []).map((i) =>
      typeof i === 'number' ? { value: i, label: i } : i
    );
  }

  get backwardLabel() {
    return this.args.backwardLabel ?? LABELS.backward;
  }

  get forwardLabel() {
    return this.args.forwardLabel ?? LABELS.forward;
  }

  changePage = (page?: number) => {
    if (page) {
      this.args.change?.({
        page: this.pages ? Math.min(page, this.pages) : page,
        pageSize: this.args.pageSize
      });
    }
  };

  changePageSize = (pageSize: string) => {
    this.args.change?.({
      page: this.page,
      pageSize: Number.parseInt(pageSize)
    });
  };

  prev = () => {
    if (this.page > 1) {
      this.changePage(this.page - 1);
    }
  };

  next = () => {
    if (this.pages) {
      if (this.page < this.pages) {
        this.changePage(this.page + 1);
      }
    } else {
      this.changePage(this.page + 1);
    }
  };

  <template>
    <div class={{styles.pagination}} data-test-pagination>
      {{#if @pageSizes}}
        <span part="page-size">
          {{this.itemsPerPageLabel}}

          {{! @glint-ignore }}
          <Select @spacing="-1" @value={{@pageSize}} @update={{this.changePageSize}} as |s|>
            {{#each this.pageSizeOptions as |o|}}
              <s.Option @value={{o.value}}>{{o.label}}</s.Option>
            {{/each}}
          </Select>
        </span>
      {{/if}}
      <span part="items">
        {{#if @totalItems}}
          {{this.itemRangeLabel}}
        {{else}}
          {{this.itemLabel}}
        {{/if}}
      </span>
      <span part="page">
        {{#if @totalItems}}
          {{#if (gt this.pages 20)}}
            <NumberInput @spacing="-1" @value={{this.page}} @update={{this.changePage}} />
          {{else}}
            {{! @glint-ignore }}
            <Select @spacing="-1" @value={{this.page}} @update={{this.changePage}} as |s|>
              {{#each (range (asNumber this.pages)) as |p|}}
                <s.Option @value={{p}}>{{p}}</s.Option>
              {{/each}}
            </Select>
          {{/if}}
          {{this.pageRangeLabel}}
        {{else}}
          {{this.pageLabel}}
        {{/if}}
      </span>
      <span part="nav">
        <IconButton
          @push={{this.prev}}
          @icon={{PrevIcon}}
          @label={{this.backwardLabel}}
          @importance="plain"
          @spacing="-1"
          data-test-prev
        />
        <IconButton
          @push={{this.next}}
          @icon={{NextIcon}}
          @label={{this.forwardLabel}}
          @importance="plain"
          @spacing="-1"
          data-test-next
        />
      </span>
    </div>
  </template>
}
