import type { Control, ControlArgs, Item } from '../controls/control';
import type { EmitStrategy } from './emit-strategy';

export class IndexEmitStrategy implements EmitStrategy {
  private args: ControlArgs;
  private control: Control;

  constructor(args: ControlArgs, widget: Control) {
    this.args = args;
    this.control = widget;
    this.control.setEmitter(this);
  }

  updateArguments(args: ControlArgs) {
    this.args = args;
  }

  select(items: Item[]) {
    return this.args.select?.(this.getSelectionIndices(items));
  }

  activateItem(item: Item) {
    const index = this.control.items.indexOf(item);

    return this.args.activateItem?.(index);
  }

  protected getSelectionIndices(selection: Item[]) {
    return selection.map((i) => this.control.items.indexOf(i)).filter((i) => i !== -1);
  }
}
