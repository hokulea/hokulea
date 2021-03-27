import isEqual from 'lodash.isequal';

import Composite from '../../../composites/composite';
import SelectableComposite from '../../../composites/selectable-composite';
import { SelectCompositeArgs } from '../../composite';
import UpdateStrategy from './update-strategy';

export default class DerievedUpdateStrategy<T> implements UpdateStrategy<T> {
  private composite;

  private items?: T[];
  private selection?: T[];
  private activeItem?: T;

  constructor(composite: Composite) {
    this.composite = composite;
  }

  updateArguments(args: SelectCompositeArgs<T>): void {
    if (!isEqual(args.objects, this.items)) {
      this.items = args.objects as T[];
      this.read();
    }

    if (
      this.composite instanceof SelectableComposite &&
      !isEqual(args.selection, this.selection)
    ) {
      this.selection = args.selection as T[];
      const indices = new Set(
        (args.selection ?? []).map(i => (this.items ?? []).indexOf(i))
      );
      const selection = this.composite.elements.filter((_item, idx) =>
        indices.has(idx)
      );
      this.composite.select(selection);
    }

    if (!isEqual(args.focusObject, this.activeItem)) {
      this.activeItem = args.focusObject as T;
      const index = this.items?.indexOf(this.activeItem);
      const activeItem =
        index !== undefined ? this.composite.elements[index] : undefined;
      this.composite.moveFocus(activeItem);
    }
  }

  private read() {
    this.composite.readElements();

    if (this.composite instanceof SelectableComposite) {
      this.composite.readSelection();
    }
  }
}
