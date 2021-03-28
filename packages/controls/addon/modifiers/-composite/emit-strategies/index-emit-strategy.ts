import EmitStrategy from '@hokulea/controls/modifiers/-composite/emit-strategies/emit-strategy';

import Composite, { CompositeElement } from '../../../composites/composite';
import { CompositeArgs } from '../../composite';
import { getSelectionIndices } from './selection';

export default class IndexEmitStrategy<T = unknown> implements EmitStrategy {
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
    this.args.focus?.(index);
  }

  select(selection: CompositeElement[]): void {
    const indices = getSelectionIndices(this.composite.elements, selection);
    this.args.select?.(indices);
  }
}
