import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import styles from '@hokulea/core/navigation.module.css';

import { IconButton } from '../actions/icon-button.gts';
import { Select } from '../controls/select.gts';

const FirstIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M200 48v160a8 8 0 0 1-13.66 5.66l-80-80a8 8 0 0 1 0-11.32l80-80A8 8 0 0 1 200 48M72 40a8 8 0 0 0-8 8v160a8 8 0 0 0 16 0V48a8 8 0 0 0-8-8"/></svg>`;
const PrevIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M168 48v160a8 8 0 0 1-13.66 5.66l-80-80a8 8 0 0 1 0-11.32l80-80A8 8 0 0 1 168 48"/></svg>`;
const NextIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="256"
height="256" viewBox="0 0 256 256"><path fill="currentColor" d="m181.66
133.66l-80 80A8 8 0 0 1 88 208V48a8 8 0 0 1 13.66-5.66l80 80a8 8 0 0 1 0
11.32"/></svg>`;
const LastIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M149.66 122.34a8 8 0 0 1 0 11.32l-80 80A8 8 0 0 1 56 208V48a8 8 0 0 1 13.66-5.66ZM184 40a8 8 0 0 0-8 8v160a8 8 0 0 0 16 0V48a8 8 0 0 0-8-8"/></svg>`;

const DEFAULTS = {
  backwardLabel: 'Previous page',
  firstLabel: 'First page',
  forwardLabel: 'Next page',
  lastLabel: 'Last page',
  itemPerPage: 'Items per page:',
  itemRangeLabel: (min: number, max: number, total: number) => `${min} - ${max} of ${total} items`,
  itemLabel: (min: number, max: number) => `${min}–${max} items`,
  pageLabel: (page: number) => `page ${page}`,
  pageNumberLabel: 'Page Number'
};

interface PaginationSignature {
  Element: HTMLElement;
  Args: {
    backwardLabel?: string;
    firstLabel?: string;
    forwardLabel?: string;
    lastLabel?: string;
    itemsPerPageLabel?: string;
    itemRangeLabel?: (min: number, max: number, total: number) => string;
    itemLabel?: (min: number, max: number) => string;
    page?: number;
    pageSize: number;
    pageSizes?: number[] | { label: string; value: number }[];
    pageLabel?: (page: number) => string;
    pageNumberLabel?: string;
    totalItems?: number;
  };
}

export class Pagination extends Component<PaginationSignature> {
  @tracked total = 0;

  get minItems() {
    return (this.page - 1) * this.args.pageSize + 1;
  }

  get maxItems() {
    return this.page * (this.args.pageSize + 1);
  }

  get pages(): number | undefined {
    if (this.args.totalItems) {
      Math.ceil(this.args.totalItems / this.args.pageSize);
    }

    return undefined;
  }

  get page() {
    return this.args.page ?? 1;
  }

  get itemsPerPageLabel() {
    return this.args.itemsPerPageLabel ?? DEFAULTS.itemPerPage;
  }

  get itemRangeLabel() {
    return (this.args.itemRangeLabel ?? DEFAULTS.itemRangeLabel)(
      this.minItems,
      this.maxItems,
      this.total
    );
  }

  get itemLabel() {
    return (this.args.itemLabel ?? DEFAULTS.itemLabel)(this.minItems, this.maxItems);
  }

  get pageLabel() {
    return (this.args.pageLabel ?? DEFAULTS.pageLabel)(this.page);
  }

  get pageNumberLabel() {
    return this.args.pageNumberLabel ?? DEFAULTS.pageNumberLabel;
  }

  get pageSizeOptions() {
    return (this.args.pageSizes ?? []).map((i) =>
      typeof i === 'number' ? { value: i, label: i } : i
    );
  }

  get backwardLabel() {
    return this.args.backwardLabel ?? DEFAULTS.backwardLabel;
  }

  get forwardLabel() {
    return this.args.forwardLabel ?? DEFAULTS.forwardLabel;
  }

  get firstLabel() {
    return this.args.firstLabel ?? DEFAULTS.firstLabel;
  }

  get lastLabel() {
    return this.args.lastLabel ?? DEFAULTS.lastLabel;
  }

  <template>
    <div class={{styles.pagination}}>
      {{#if @pageSizes}}
        <span>
          {{this.itemsPerPageLabel}}

          <Select @spacing="-1" as |s|>
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
      <span>

      </span>
      <span>
        <IconButton
          @icon={{PrevIcon}}
          @label={{this.backwardLabel}}
          @importance="plain"
          @spacing="-1"
        />
        <IconButton
          @icon={{NextIcon}}
          @label={{this.forwardLabel}}
          @importance="plain"
          @spacing="-1"
        />
      </span>
    </div>
  </template>
}
