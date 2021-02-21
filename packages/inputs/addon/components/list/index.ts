import { action } from '@ember/object';
import Component from '@glimmer/component';

export interface ListArgs {
  multiselect?: boolean;
  items: unknown[];
  selection: unknown[];
  select: (selection: unknown[]) => void;
  activateItem: (item: unknown) => void;
}

export default class ListComponent extends Component<ListArgs> {
  @action
  select(selection: unknown[]) {
    console.log('List.select', selection);

    // const selection = indices.map(idx => this.args.items[idx]);
    this.args.select?.(selection);
  }

  @action
  activateItem(item: unknown) {
    this.args.activateItem?.(item);
  }
}
