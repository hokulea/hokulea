import isEqual from 'lodash.isequal';

import type { Control, ControlArgs } from '../controls/control';
import type { UpdateStrategy } from './update-strategy';

export class DerievedUpdateStrategy<T> implements UpdateStrategy<T> {
  private control;

  private items?: T[];
  private selection?: T[];
  private activeItem?: T;

  constructor(control: Control) {
    this.control = control;
  }

  updateArguments(args: ControlArgs<T>) {
    if (!isEqual(args.items, this.items)) {
      this.items = args.items as T[];
      this.control.readItems();
      this.control.readSelection();
    }

    if (!isEqual(args.selection, this.selection)) {
      this.selection = args.selection as T[];

      const indices = new Set((args.selection ?? []).map((i) => (this.items ?? []).indexOf(i)));
      const selection = this.control.items.filter((_item, idx) => indices.has(idx));

      this.control.select(selection);
    }

    if (!isEqual(args.activeItem, this.activeItem)) {
      this.activeItem = args.activeItem as T;

      const index = this.items?.indexOf(args.activeItem);
      const activeItem = index !== undefined ? this.control.items[index] : undefined;

      this.control.activateItem(activeItem);
    }
  }
}
