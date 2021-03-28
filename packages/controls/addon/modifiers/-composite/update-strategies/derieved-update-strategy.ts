import isEqual from 'lodash.isequal';

import Composite from '../../../composites/composite';
import { CompositeArgs } from '../../composite';
import UpdateStrategy from './update-strategy';

export default class DerievedUpdateStrategy<T> implements UpdateStrategy<T> {
  private composite;

  private items?: T[];
  private selection?: T[];
  private activeItem?: T;

  constructor(composite: Composite) {
    this.composite = composite;
  }

  updateArguments(args: CompositeArgs<T>): void {
    if (!isEqual(args.objects, this.items)) {
      this.items = args.objects as T[];
      this.read();
    }

    if (this.composite.selection && !isEqual(args.selection, this.selection)) {
      this.selection = args.selection as T[];
      const indices = new Set(
        (args.selection ?? []).map(i => (this.items ?? []).indexOf(i))
      );
      const selection = this.composite.elements.filter((_item, idx) =>
        indices.has(idx)
      );
      this.composite.selection.select(selection);
    }

    if (
      this.composite.focusManagement &&
      !isEqual(args.focusObject, this.activeItem)
    ) {
      this.activeItem = args.focusObject as T;
      const index = this.items?.indexOf(this.activeItem);
      const activeItem =
        index !== undefined ? this.composite.elements[index] : undefined;
      this.composite.focusManagement.focus(activeItem);
    }
  }

  private read() {
    this.composite.readElements();

    if (this.composite.selection) {
      this.composite.selection.read();
    }
  }
}
