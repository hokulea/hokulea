import type { Control, ControlArgs, Item } from '../controls/control';
import type { EmitStrategy } from './emit-strategy';

export class NoopEmitStrategy implements EmitStrategy {
  constructor(_args: ControlArgs, control: Control) {
    control.setEmitter(this);
  }

  select(_items: Item[]) {
    return false;
  }

  activateItem(_item: Item) {
    return false;
  }
}
