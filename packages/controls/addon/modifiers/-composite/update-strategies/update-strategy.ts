import { CompositeArgs, SelectCompositeArgs } from '../../composite';

export default interface UpdateStrategy<T> {
  updateArguments(args: CompositeArgs<T> | SelectCompositeArgs<T>): void;
}
