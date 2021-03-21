import { Item } from '../../../controls/control';

export default interface EmitStrategy {
  select(selection: Item[]): void;

  activateItem(item?: Item): void;
}
