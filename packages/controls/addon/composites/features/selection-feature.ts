import isEqual from 'lodash.isequal';

import Composite, { CompositeElement } from '../composite';
import KeyboardCollectionNavigationStrategy, {
  KeyboardCollectionNavigationListener
} from '../navigation-strategies/keyboard-collection-navigation';
import KeyboardEdgeNavigationStrategy, {
  KeyboardEdgeNavigationListener
} from '../navigation-strategies/keyboard-edge-navigation';
import MouseInvokeNavigationStrategy, {
  MouseInvokeNavigationListener
} from '../navigation-strategies/mouse-invoke-navigation';
import NavigationStrategy from '../navigation-strategies/navigation-strategy';
import Feature from './feature';

export interface SelectionEmitter {
  select(elements: CompositeElement[]): void;
}

export interface SelectionOptions {
  persistSelection?: boolean;
}

const DEFAULT_OPTIONS: SelectionOptions = {
  persistSelection: true
};

export default class SelectionFeature
  implements
    Feature,
    KeyboardEdgeNavigationListener,
    KeyboardCollectionNavigationListener,
    MouseInvokeNavigationListener,
    NavigationStrategy {
  private composite: Composite;
  private options: SelectionOptions;
  private emitter?: SelectionEmitter;

  selection: CompositeElement[] = [];
  multiple = false;
  private shiftItem?: CompositeElement;

  constructor(
    composite: Composite,
    navigation: NavigationStrategy[],
    config: {
      emitter?: SelectionEmitter;
      options?: SelectionOptions;
    }
  ) {
    this.composite = composite;
    this.emitter = config.emitter;
    this.options = {
      ...DEFAULT_OPTIONS,
      ...config.options
    };

    for (const strategy of navigation) {
      if (strategy instanceof KeyboardCollectionNavigationStrategy) {
        strategy.addListener(this);
      } else if (strategy instanceof KeyboardEdgeNavigationStrategy) {
        strategy.addListener(this);
      } else if (strategy instanceof MouseInvokeNavigationStrategy) {
        strategy.addListener(this);
      }
    }

    this.readOptions();
  }

  read(): void {
    this.readOptions();
    this.readSelection();
  }

  private readOptions(): void {
    this.multiple =
      (this.composite.element?.hasAttribute('aria-multiselectable') &&
        this.composite.element.getAttribute('aria-multiselectable') ===
          'true') ||
      false;
  }

  private readSelection(): void {
    const selection = [
      ...this.composite.element.querySelectorAll('[aria-selected="true"]')
    ] as CompositeElement[];

    this.select(selection);
  }

  // IO for selection feature

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
    for (const element of this.composite.elements) {
      if (selection.includes(element)) {
        element.setAttribute('aria-selected', 'true');
      } else {
        element.removeAttribute('aria-selected');
      }
    }
  }

  // navigation

  navigate(event: Event): void {
    if (event instanceof KeyboardEvent) {
      if (event.type === 'keydown') {
        this.selectWithKeyboard(event);
        this.selectKeyCombinations(event);
      }

      if (event.type === 'keyup' && !event.shiftKey) {
        this.shiftItem = undefined;
      }
    }
  }

  private selectWithKeyboard(event: KeyboardEvent) {
    const focusElement = this.composite.focusManagement?.focusElement;

    if (event.key === ' ' && focusElement && this.multiple) {
      // handle select and active item
      if (this.selection.includes(focusElement)) {
        this.deselectElement(focusElement);
      } else {
        this.selectAdd(focusElement);
      }
      event.preventDefault();
    }
  }

  /**
   * Handles special keyboard control cases, such as handling the spacebar key
   * and cmd/ctrl + a
   */
  private selectKeyCombinations(event: KeyboardEvent) {
    // ctrl+a
    if ((event.key === 'KeyA' || event.key === 'a') && event.metaKey) {
      this.selectAll();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // navigation strategy listeners

  invoke(element: CompositeElement, event: MouseEvent): void {
    event.stopPropagation();

    if (event.shiftKey) {
      this.selectShift(element);
    } else if (event.metaKey) {
      if (this.selection.includes(element)) {
        this.deselectElement(element);
      } else {
        this.selectAdd(element);
      }
    } else {
      this.selectElement(element);
    }
  }

  navigatePrevious(element: CompositeElement, event: KeyboardEvent): void {
    if (this.multiple) {
      if (event.shiftKey) {
        this.selectShift(element);
      }
    } else {
      this.selectElement(element);
    }
  }

  navigateNext(element: CompositeElement, event: KeyboardEvent): void {
    if (this.multiple) {
      if (event.shiftKey) {
        this.selectShift(element);
      }
    } else {
      this.selectElement(element);
    }
  }

  navigateHome(element: CompositeElement, event: KeyboardEvent): void {
    if (this.multiple) {
      if (event.shiftKey) {
        this.selectShift(element);
      }
    } else {
      this.selectElement(element);
    }
  }

  navigateEnd(element: CompositeElement, event: KeyboardEvent): void {
    if (this.multiple) {
      if (event.shiftKey) {
        this.selectShift(element);
      }
    } else {
      this.selectElement(element);
    }
  }

  // selection logic

  private selectAll(): void {
    if (this.multiple) {
      this.select(this.composite.elements);
    }
  }

  private selectElement(element: HTMLElement): void {
    this.shiftItem = element;

    this.select([element]);
  }

  private deselectElement(element: HTMLElement): void {
    if (this.selection.includes(element)) {
      const selection = this.selection.slice();
      selection.splice(selection.indexOf(element), 1);
      this.select(selection);
    }
  }

  private selectAdd(item: HTMLElement) {
    const selection = this.multiple ? this.selection.slice() : [];
    selection.push(item);

    this.shiftItem = item;
    this.select(selection);
  }

  private selectRange(from: number, to: number) {
    if (this.multiple) {
      const selection = [];
      let i = from;
      const up = to > from;

      while (up ? i <= to : i >= to) {
        selection.push(this.composite.elements[i]);
        i += up ? 1 : -1;
      }
      this.select(selection);
    }
  }

  private selectShift(item: HTMLElement) {
    // only, when selection mode is MULTI
    if (this.multiple && this.shiftItem) {
      const indexShift = this.composite.elements.indexOf(this.shiftItem);
      const indexItem = this.composite.elements.indexOf(item);
      this.selectRange(indexShift, indexItem);
    } else {
      this.selectElement(item);
    }
  }
}
