import type { Control } from '../controls/control';
import type { UpdateStrategy } from './update-strategy';

export class ReactiveUpdateStrategy implements UpdateStrategy {
  constructor(private control?: Control) {}

  setControl(control: Control) {
    this.control = control;
  }

  updateItems() {
    this.control?.readItems();
  }

  updateSelection() {
    this.control?.readSelection();
  }

  updateOptions() {
    this.control?.readOptions();
  }
}
