import { CompositeElement } from '../../../composites/composite';
import { CompositeArgs } from '../../composite';
import EmitStrategy from './emit-strategy';

export default class NoopEmitStrategy implements EmitStrategy {
  updateArguments(_args: CompositeArgs<unknown>): void {
    // noop
  }

  select(_elements: CompositeElement[]): void {
    // noop
  }

  focus(_element: CompositeElement): void {
    // noop
  }
}
