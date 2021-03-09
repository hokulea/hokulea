import { Item } from '../controls/control';

export type PersistResult = boolean | undefined;

export default interface EmitStrategy {
  select(selection: Item[]): PersistResult;

  activateItem(item?: Item): PersistResult;
}
