import { action } from '@ember/object';
import Component from '@glimmer/component';

export interface ListArgs {
  items: unknown[];
  selection: unknown[];
  select: (selection: unknown[]) => void;
  multiselect?: boolean;
}

export default class ListComponent extends Component<ListArgs> {
  @action
  select(indices: number[]) {
    const selection = indices.map(idx => this.args.items[idx]);
    this.args.select?.(selection);
  }
}
