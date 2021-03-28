import EmitStrategy from '@hokulea/controls/modifiers/-composite/emit-strategies/emit-strategy';
import { getSelectionIndices } from '@hokulea/controls/modifiers/-composite/emit-strategies/selection';

import Composite, { CompositeElement } from '../../../composites/composite';
import { CompositeArgs } from '../../composite';

export default class ObjectEmitStrategy<T = unknown> implements EmitStrategy {
  protected args: CompositeArgs<T>;
  protected composite: Composite;

  constructor(args: CompositeArgs<T>, composite: Composite) {
    this.args = args;
    this.composite = composite;
  }

  updateArguments(args: CompositeArgs<T>): void {
    this.args = args;
  }

  focus(item: CompositeElement): void {
    const index = this.composite.elements.indexOf(item);
    const activeItem = this.args.objects?.[index];
    this.args.focus?.(activeItem);
  }

  select(selection: CompositeElement[]): void {
    const indices = getSelectionIndices(this.composite.elements, selection);
    const items = indices.map(i => this.args.objects?.[i]) as T[];
    this.args.select?.(items);
  }
}
