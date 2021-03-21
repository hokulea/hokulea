import { Item } from '../../../controls/control';
import EmitStrategy from './emit-strategy';

export default class NoopEmitStrategy implements EmitStrategy {
  select(_items: Item[]) {
    return false;
  }

  activateItem(_item: Item) {
    return false;
  }
}
