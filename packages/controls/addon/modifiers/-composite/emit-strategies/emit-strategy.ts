import { Emitter } from '../../../composites/composite';
import { CompositeArgs } from '../../composite';

export default interface EmitStrategy<A extends CompositeArgs = CompositeArgs>
  extends Emitter {
  updateArguments(args: A): void;
}
