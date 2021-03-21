import Control, { Item } from '../../../controls/control';
import { ControlArgs } from '../../control';
import EmitStrategy from './emit-strategy';

export default class ItemEmitStrategy implements EmitStrategy {
  private args: ControlArgs;
  private control: Control;

  constructor(args: ControlArgs, widget: Control) {
    this.args = args;
    this.control = widget;
  }

  updateArguments(args: ControlArgs) {
    this.args = args;
  }

  select(selection: Item[]) {
    const indices = this.getSelectionIndices(selection);
    const items = indices.map(i => this.args.items?.[i] ?? i);
    this.args.select?.(items);
  }

  activateItem(item: Item) {
    const index = this.control.items.indexOf(item);
    const activeItem = this.args.items?.[index];
    this.args.activateItem?.(activeItem);
  }

  protected getSelectionIndices(selection: Item[]) {
    return selection
      .map(i => this.control.items.indexOf(i))
      .filter(i => i !== -1);
  }
}
