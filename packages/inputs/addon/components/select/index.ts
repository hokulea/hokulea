import { action } from '@ember/object';
import Component from '@glimmer/component';

import { InputControl } from '@hokulea/inputs/components/input-builder';

interface SelectArgs<T> extends InputControl<T | T[]> {
  options: T[];
  multiple: boolean;
}

export default class SelectComponent<T> extends Component<SelectArgs<T>> {
  private list?: HTMLElement;

  @action
  setupList(element: HTMLElement) {
    this.list = element;
  }

  @action
  handleExpansion() {
    this.list?.dispatchEvent(new Event('focusin'));
  }

  @action
  select(options: T[]) {
    const value =
      !this.args.multiple && options.length > 0 ? options[0] : options;
    this.args.update?.(value);
  }
}
