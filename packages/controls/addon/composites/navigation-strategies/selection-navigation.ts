import { CompositeElement } from '../composite';
import Composite from '../selectable-composite';
import { KeyboardCollectionNavigationNotifier } from './keyboard-collection-navigation';
import { KeyboardEdgeNavigationNotifier } from './keyboard-edge-navigation';

export default class SelectionNavigation
  implements
    KeyboardCollectionNavigationNotifier,
    KeyboardEdgeNavigationNotifier {
  private composite: Composite;

  private shiftItem?: CompositeElement;

  constructor(composite: Composite) {
    this.composite = composite;
  }

  navigate(event: Event): void {
    if (event instanceof MouseEvent && event.type === 'mousedown') {
      this.navigateWithMouse(event);
    } else if (event instanceof KeyboardEvent) {
      this.navigateWithKeyboard(event);
    }
  }

  private navigateWithMouse(event: MouseEvent) {
    const item = event.target as HTMLElement;
    if (item !== null) {
      this.composite.moveFocus(item);
      event.stopPropagation();

      if (event.shiftKey) {
        this.selectShift(item);
      } else if (event.metaKey) {
        if (this.composite.selection.includes(item)) {
          this.deselect(item);
        } else {
          this.selectAdd(item);
        }
      } else {
        this.select(item);
      }
    }
  }

  private navigateWithKeyboard(event: KeyboardEvent) {
    if (event.type === 'keydown') {
      this.selectWithKeyboard(event);
      this.selectKeyCombinations(event);
    }

    if (event.type === 'keyup' && !event.shiftKey) {
      this.shiftItem = undefined;
    }
  }

  private selectWithKeyboard(event: KeyboardEvent) {
    if (
      event.key === ' ' &&
      this.composite.focusElement &&
      this.composite.multiple
    ) {
      // handle select and active item
      if (this.composite.selection.includes(this.composite.focusElement)) {
        this.deselect(this.composite.focusElement);
      } else {
        this.selectAdd(this.composite.focusElement);
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

  navigatePrevious(element: CompositeElement, event: KeyboardEvent): void {
    if (this.composite.multiple) {
      if (event.shiftKey) {
        this.selectShift(element);
      }
    } else {
      this.select(element);
    }
  }

  navigateNext(element: CompositeElement, event: KeyboardEvent): void {
    if (this.composite.multiple) {
      if (event.shiftKey) {
        this.selectShift(element);
      }
    } else {
      this.select(element);
    }
  }

  navigateHome(element: CompositeElement, event: KeyboardEvent): void {
    if (this.composite.multiple) {
      if (event.shiftKey) {
        this.selectShift(element);
      }
    } else {
      this.select(element);
    }
  }

  navigateEnd(element: CompositeElement, event: KeyboardEvent): void {
    if (this.composite.multiple) {
      if (event.shiftKey) {
        this.selectShift(element);
      }
    } else {
      this.select(element);
    }
  }

  // selection logic

  selectAll(): void {
    if (this.composite.multiple) {
      this.composite.select(this.composite.elements);
    }
  }

  select(item: HTMLElement): void {
    this.shiftItem = item;

    this.composite.select([item]);
  }

  private deselect(item: HTMLElement): void {
    if (this.composite.selection.includes(item)) {
      const selection = this.composite.selection.slice();
      selection.splice(selection.indexOf(item), 1);
      this.composite.select(selection);
    }
  }

  private selectAdd(item: HTMLElement) {
    const selection = this.composite.multiple
      ? this.composite.selection.slice()
      : [];
    selection.push(item);

    this.shiftItem = item;
    this.composite.select(selection);
  }

  private selectRange(from: number, to: number) {
    if (this.composite.multiple) {
      const selection = [];
      let i = from;
      const up = to > from;

      while (up ? i <= to : i >= to) {
        selection.push(this.composite.elements[i]);
        i += up ? 1 : -1;
      }
      this.composite.select(selection);
    }
  }

  private selectShift(item: HTMLElement) {
    // only, when selection mode is MULTI
    if (this.composite.multiple && this.shiftItem) {
      const indexShift = this.composite.elements.indexOf(this.shiftItem);
      const indexItem = this.composite.elements.indexOf(item);
      this.selectRange(indexShift, indexItem);
    } else {
      this.select(item);
    }
  }
}
