import type { Control, Item } from '../controls/control';
import type { EmitStrategy, EmitterOptions } from './emit-strategy';

export class IndexEmitStrategy implements EmitStrategy {
  constructor(
    private control: Control,
    private options: EmitterOptions<number>
  ) {
    this.control.setEmitStrategy(this);
  }

  selected(selection: Item[]) {
    const indices = selection.map((i) => this.control.items.indexOf(i)).filter((i) => i !== -1);

    return this.options.select?.(indices);
  }

  itemActivated(item: Item) {
    const index = this.control.items.indexOf(item);

    return this.options.activateItem?.(index);
  }
}
