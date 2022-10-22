import { action } from '@ember/object';
import Component from '@glimmer/component';

import { Control, Multiple } from '../control';

export interface ListArgs<T> extends Control<T | T[]>, Multiple {
  options: T[];
  activateItem: (item: T) => void;
}

export default class ListComponent<T> extends Component<ListArgs<T>> {
  @action
  select(selection: T[]) {
    const value = this.args.multiple
      ? selection
      : selection.length > 0
      ? selection[0]
      : undefined;

    this.args.update?.(value);
  }

  @action
  activateItem(item: T) {
    this.args.activateItem?.(item);
  }
}
