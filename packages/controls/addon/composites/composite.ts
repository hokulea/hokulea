import { action } from '@ember/object';

import FocusStrategy from './focus-management/focus-strategy';
import NavigationStrategy from './navigation-strategies/navigation-strategy';

export type CompositeElement = HTMLElement;
// export type List = CompositeElement[];
// export type Tree = TreeItem[];
// export type TreeItem = {
//   item: CompositeElement;
//   children: TreeItem[];
// };

export interface Emitter {
  focus(element?: CompositeElement): void;
}

export interface CompositeOptions {
  persistFocus?: boolean;
  persistSelection?: boolean;
}

const DEFAULT_OPTIONS: CompositeOptions = {
  persistFocus: true,
  persistSelection: true
};

export default abstract class Composite {
  element: HTMLElement;
  elements: CompositeElement[] = [];
  focusElement?: CompositeElement;

  protected options: CompositeOptions;
  protected emitter: Emitter;
  protected abstract get focusStrategy(): FocusStrategy;
  protected abstract get navigationStrategy(): NavigationStrategy;

  constructor(
    element: HTMLElement,
    emitter: Emitter,
    options?: CompositeOptions
  ) {
    this.element = element;
    this.emitter = emitter;
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    };

    element.addEventListener('mousedown', this.navigate);
    element.addEventListener('mouseup', this.navigate);
    element.addEventListener('keydown', this.navigate);
    element.addEventListener('keyup', this.navigate);
    element.addEventListener('focusin', this.focusIn);
    element.addEventListener('focusout', this.focusOut);

    this.readOptions();
  }

  teardown(): void {
    this.element.removeEventListener('mousedown', this.navigate);
    this.element.removeEventListener('mouseup', this.navigate);
    this.element.removeEventListener('keydown', this.navigate);
    this.element.removeEventListener('keyup', this.navigate);
    this.element.removeEventListener('focusin', this.focusIn);
    this.element.removeEventListener('focusout', this.focusOut);
  }

  // read in from DOM

  public read(): void {
    this.readOptions();
    this.readElements();
    this.readFocusElement();
  }

  readOptions(): void {
    // implement this
  }

  readFocusElement(): void {
    const focusElement = this.focusStrategy.readFocus(this.element);

    this.moveFocus(focusElement);
  }

  readElements(): void {
    this.elements = [];
  }

  // mutate state

  moveFocus(element?: CompositeElement): void {
    if (element === this.focusElement) {
      return;
    }

    this.focusElement = element;
    this.emitter.focus(this.focusElement);

    if (this.options.persistFocus && this.focusElement && this.focusStrategy) {
      this.focusStrategy.persistFocus(this.focusElement);
    }
  }

  // event handlers

  @action
  focusIn(event: FocusEvent): void {
    if (this.elements.length === 0) {
      return;
    }

    if (!this.hasFocus(event)) {
      this.moveFocus(this.elements[0]);
    }
  }

  @action
  focusOut(): void {
    // implement this
  }

  @action
  navigate(event: MouseEvent | KeyboardEvent): void {
    if (this.navigationStrategy) {
      this.navigationStrategy.navigate(event);
    }
  }

  protected hasFocus(event: FocusEvent): boolean {
    if (!document.activeElement) {
      return false;
    }

    // quick and cheap check if active element _IS_ the composite
    if (document.activeElement === this.element) {
      return true;
    }

    // check if activeElement is _WITHIN_ the composite
    return this.elements.includes(event.relatedTarget as HTMLElement);
  }
}
