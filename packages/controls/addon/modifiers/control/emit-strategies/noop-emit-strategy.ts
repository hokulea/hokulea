import { ControlArgs } from '../../control';
import Control, { Item } from '../controls/control';
import EmitStrategy from './emit-strategy';

export default class NoopEmitStrategy implements EmitStrategy {
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
