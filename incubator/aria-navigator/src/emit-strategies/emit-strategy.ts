import type { Item } from '../controls/control';

export type PersistResult = boolean | undefined;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface EmitStrategy {
  select(selection: Item[]): PersistResult;

  activateItem(item?: Item): PersistResult;
}
