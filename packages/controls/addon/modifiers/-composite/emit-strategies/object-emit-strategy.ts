import Composite, {
  CompositeElement,
  Emitter
} from '../../../composites/composite';
import { CompositeArgs } from '../../composite';

export default class ObjectEmitStrategy<
  A extends CompositeArgs<T>,
  C extends Composite,
  T = unknown
> implements Emitter {
  protected args: A;
  protected composite: C;

  constructor(args: A, composite: C) {
    this.args = args;
    this.composite = composite;
  }

  updateArguments(args: A) {
    this.args = args;
  }

  focus(item: CompositeElement) {
    const index = this.composite.elements.indexOf(item);
    const activeItem = this.args.objects?.[index];
    this.args.moveFocus?.(activeItem);
  }

  protected getSelectionIndices(selection: CompositeElement[]): number[] {
    return selection
      .map(i => this.composite.elements.indexOf(i))
      .filter(i => i !== -1);
  }
}
