import { action } from '@ember/object';
import Component from '@glimmer/component';

import { InputControl } from '@hokulea/inputs/components/input-builder';

interface SelectArgs extends InputControl<unknown | unknown[]> {
  options: unknown[];
  multiple: boolean;
}

export default class SelectComponent extends Component<SelectArgs> {
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
  select(options: unknown[]) {
    const value = this.args.multiple
      ? options
      : options.length > 0
      ? options[0]
      : undefined;
    this.args.update?.(value);
  }
}
