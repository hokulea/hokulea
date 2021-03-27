import { action } from '@ember/object';

import isEqual from 'lodash.isequal';

import Composite, {
  CompositeElement,
  CompositeOptions,
  Emitter
} from './composite';

export interface SelectEmitter extends Emitter {
  select(elements: CompositeElement[]): void;
}

export interface SelectableCompositeOptions extends CompositeOptions {
  persistSelection?: boolean;
}

const DEFAULT_OPTIONS: SelectableCompositeOptions = {
  persistFocus: true,
  persistSelection: true
};

export default abstract class SelectableComposite extends Composite {
  protected options: SelectableCompositeOptions;
  protected emitter: SelectEmitter;

  multiple = false;
  selection: CompositeElement[] = [];

  constructor(
    element: HTMLElement,
    emitter: SelectEmitter,
    options?: SelectableCompositeOptions
  ) {
    super(element, emitter, options);

    this.emitter = emitter;
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    };
  }

  read(): void {
    super.read();
    this.readSelection();
  }

  readOptions(): void {
    super.readOptions();
    this.multiple =
      (this.element?.hasAttribute('aria-multiselectable') &&
        this.element.getAttribute('aria-multiselectable') === 'true') ||
      false;
  }

  readSelection(): void {
    const selection = [
      ...this.element.querySelectorAll('[aria-selected="true"]')
    ] as HTMLElement[];

    this.select(selection);
  }

  select(selection: CompositeElement[]): void {
    if (isEqual(selection, this.selection)) {
      return;
    }

    this.selection = selection;
    this.emitter?.select(this.selection);

    if (this.options.persistSelection) {
      this.persistSelection(this.selection);
    }
  }

  private persistSelection(selection: CompositeElement[]) {
    for (const element of this.elements) {
      if (selection.includes(element)) {
        element.setAttribute('aria-selected', 'true');
      } else {
        element.removeAttribute('aria-selected');
      }
    }
  }

  @action
  focusIn(): void {
    if (this.elements.length === 0) {
      return;
    }

    if (this.selection.length > 0) {
      this.moveFocus(this.selection[0]);
    } else {
      this.moveFocus(this.elements[0]);

      if (!this.multiple) {
        this.select([this.elements[0]]);
      }
    }
  }
}
