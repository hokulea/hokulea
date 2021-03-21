import Control, { Item } from '../control';
import { KeyboardCollectionNavigationNotifier } from './keyboard-collection-navigation';
import { KeyboardEdgeNavigationNotifier } from './keyboard-edge-navigation';

export default class SelectionNavigation
  implements
    KeyboardCollectionNavigationNotifier,
    KeyboardEdgeNavigationNotifier {
  private control: Control;

  private shiftItem?: Item;

  constructor(control: Control) {
    this.control = control;
  }

  navigate(event: Event) {
    if (event instanceof MouseEvent && event.type === 'mousedown') {
      this.navigateWithMouse(event);
    } else if (event instanceof KeyboardEvent) {
      this.navigateWithKeyboard(event);
    }
  }

  private navigateWithMouse(event: MouseEvent) {
    const item = event.target as HTMLElement;
    if (item !== null) {
      this.control.activateItem(item);
      event.stopPropagation();

      if (event.shiftKey) {
        this.selectShift(item);
      } else if (event.metaKey) {
        if (this.control.selection.includes(item)) {
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
      this.selectKeyCombinations(event);
    }

    if (event.type === 'keyup' && !event.shiftKey) {
      this.shiftItem = undefined;
    }
  }

  /**
   * Handles special keyboard control cases, such as handling the spacebar key
   * and cmd/ctrl + a
   */
  private selectKeyCombinations(event: KeyboardEvent) {
    if (event.key === ' ' && this.control.activeItem && this.control.multiple) {
      // handle select and active item
      if (this.control.selection.includes(this.control.activeItem)) {
        this.deselect(this.control.activeItem);
      } else {
        this.selectAdd(this.control.activeItem);
      }
      event.preventDefault();
    }

    // ctrl+a
    else if ((event.key === 'KeyA' || event.key === 'a') && event.metaKey) {
      this.selectAll();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  navigatePrevious(item: Item, event: KeyboardEvent) {
    if (this.control.multiple) {
      if (event.shiftKey) {
        this.selectShift(item);
      }
    } else {
      this.select(item);
    }
  }

  navigateNext(item: Item, event: KeyboardEvent) {
    if (this.control.multiple) {
      if (event.shiftKey) {
        this.selectShift(item);
      }
    } else {
      this.select(item);
    }
  }

  navigateHome(item: Item, event: KeyboardEvent) {
    if (this.control.multiple) {
      if (event.shiftKey) {
        this.selectShift(item);
      }
    } else {
      this.select(item);
    }
  }

  navigateEnd(item: Item, event: KeyboardEvent) {
    if (this.control.multiple) {
      if (event.shiftKey) {
        this.selectShift(item);
      }
    } else {
      this.select(item);
    }
  }

  // selection logic

  deselect(item: HTMLElement) {
    if (this.control.selection.includes(item)) {
      const selection = this.control.selection.slice();
      selection.splice(selection.indexOf(item), 1);
      this.control.select(selection);
    }
  }

  select(item: HTMLElement) {
    this.shiftItem = item;

    this.control.select([item]);
  }

  selectAdd(item: HTMLElement) {
    const selection = this.control.multiple
      ? this.control.selection.slice()
      : [];
    selection.push(item);

    this.shiftItem = item;
    this.control.select(selection);
  }

  selectAll() {
    if (this.control.multiple) {
      this.control.select(this.control.items);
    }
  }

  selectRange(from: number, to: number) {
    if (this.control.multiple) {
      const selection = [];
      let i = from;
      const up = to > from;

      while (up ? i <= to : i >= to) {
        selection.push(this.control.items[i]);
        i += up ? 1 : -1;
      }
      this.control.select(selection);
    }
  }

  selectShift(item: HTMLElement) {
    // only, when selection mode is MULTI
    if (this.control.multiple && this.shiftItem) {
      const indexShift = this.control.items.indexOf(this.shiftItem);
      const indexItem = this.control.items.indexOf(item);
      this.selectRange(indexShift, indexItem);
    } else {
      this.select(item);
    }
  }
}
