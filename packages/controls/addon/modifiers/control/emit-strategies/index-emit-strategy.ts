import Control, { Item } from '../../../controls/control';
import { ControlArgs } from '../../control';
import EmitStrategy from './emit-strategy';

export default class IndexEmitStrategy implements EmitStrategy {
  private args: ControlArgs;
  private control: Control;

  constructor(args: ControlArgs, widget: Control) {
    this.args = args;
    this.control = widget;
  }

  updateArguments(args: ControlArgs) {
    this.args = args;
  }

  select(items: Item[]) {
    this.args.select?.(this.getSelectionIndices(items));
  }

  activateItem(item: Item) {
    const index = this.control.items.indexOf(item);
    this.args.activateItem?.(index);
  }

  protected getSelectionIndices(selection: Item[]) {
    return selection
      .map(i => this.control.items.indexOf(i))
      .filter(i => i !== -1);
  }
}
