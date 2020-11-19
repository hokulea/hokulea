import { ControlArgs } from '../../control';

export default interface UpdateStrategy<T> {
  updateArguments(args: ControlArgs<T>): void;
}
