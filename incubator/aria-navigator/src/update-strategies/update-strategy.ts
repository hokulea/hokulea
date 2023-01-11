import type { ControlArgs } from '../controls/control';

export interface UpdateStrategy<T> {
  updateArguments(args: ControlArgs<T>): void;
}
