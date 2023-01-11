import Component from '@glimmer/component';
import { action } from '@ember/object';

import styles from './list.css';

import type { ControlArgs, Multiple } from './control';

export interface ListArgs<T> extends ControlArgs<T | T[]>, Multiple {
  options: T[];
  activateItem: (item: T) => void;
}

/**
 * Signature for the `<List>` component
 */
interface ListSignature<T> {
  Element: HTMLUListElement;
  Args: ListArgs<T>;
}

export default class List<T> extends Component<ListSignature<T>> {
  styles = styles;

  @action
  select(selection: T[]) {
    const value = this.args.multiple ? selection : selection.length > 0 ? selection[0] : undefined;

    this.args.update?.(value);
  }

  @action
  activateItem(item: T) {
    this.args.activateItem?.(item);
  }
}
