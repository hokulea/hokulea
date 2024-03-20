import { Control } from '..';
import { Item } from '../controls/control';
import { isEndEvent } from './end-navigation';
import { isHomeEvent } from './home-navigation';
import { EventNames, NavigationParameterBag, NavigationPattern } from './navigation-pattern';
import isEqual from 'lodash.isequal';

export class SelectionStrategy implements NavigationPattern {
  eventListeners: EventNames[] = ['keydown', 'keyup', 'mouseup'];

  private shiftItem?: Item;

  constructor(private control: Control) {}

  matches(event: Event): boolean {
    return this.eventListeners.includes(event.type as EventNames);
  }

  prepare(event: Event): void {
    // handle HOME and END selection
    if ((isHomeEvent(event) || isEndEvent(event)) && this.control.activeItem) {
      this.shiftItem = this.control.activeItem;
    }
  }

  handle(bag: NavigationParameterBag): NavigationParameterBag {
    const { event } = bag;

    if (event.type === 'focusin') {
      this.handleFocus();
    }

    // mouse
    else if (event instanceof MouseEvent && bag.item) {
      this.handleMouseSelection(event, bag.item);
    }

    // keyboard
    else if (event instanceof KeyboardEvent) {
      this.handleKeyboardSelection(bag);
    }

    return bag;
  }


  handleFocus() {
    // if (this.control.capabilities.multiSelection && this.control.selection.length > 0) {
    //   this.activateItem(this.control.selection[0]);
    // } else if (
    //   this.control.capabilities.singleSelection && this.control.selection.length > 0
    //     || !(this.control.capabilities.singleSelection || this.control.capabilities.multiSelection)
    // ) {
    //   this.activateItem(this.control.items[0]);
    // }

      // if (!this.multiple) {
      //   this.select([this.items[0]]);
      // }
  }

  private handleMouseSelection(event: MouseEvent, item: Item) {
    // this.control.activateItem(item);
    // event.stopPropagation();

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

  private handleKeyboardSelection(bag: NavigationParameterBag) {
    const { event, item } = bag as NavigationParameterBag & { event: KeyboardEvent };

    if (event.type === 'keydown') {
      if (item) {
        this.handleItem(event, item);
      }
      this.handleKeyCombinations(event);
    } else if (event.type === 'keyup' && !event.shiftKey) {
      this.shiftItem = undefined;
    }
  }

  private handleItem(event: KeyboardEvent, item: Item) {
    if (this.control.multiple) {
      if (event.shiftKey) {
        this.selectShift(item);
      }
    } else {
      this.select(item);
    }
  }

  /**
   * Handles special keyboard control cases, such as handling the spacebar key
   * and cmd/ctrl + a
   */
  private handleKeyCombinations(event: KeyboardEvent) {
    if (event.key === ' ' && this.control.activeItem && this.control.multiple) {
      // handle select and active item
      if (this.control.selection.includes(this.control.activeItem)) {
        this.deselect(this.control.activeItem);
      } else {
        this.selectAdd(this.control.activeItem);
      }
    }

    // ctrl+a
    else if ((event.key === 'KeyA' || event.key === 'a') && event.metaKey) {
      this.selectAll();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // selection logic

  private deselect(item: HTMLElement) {
    if (this.control.selection.includes(item)) {
      const selection = this.control.selection.slice();

      selection.splice(selection.indexOf(item), 1);
      this.persistSelection(selection);
    }
  }

  private select(item: HTMLElement) {
    this.shiftItem = item;

    this.persistSelection([item]);
  }

  private selectAdd(item: HTMLElement) {
    const selection = this.control.multiple ? this.control.selection.slice() : [];

    selection.push(item);

    this.shiftItem = item;
    this.persistSelection(selection);
  }

  private selectAll() {
    if (this.control.multiple) {
      this.persistSelection(this.control.items);
    }
  }

  private selectRange(from: number, to: number) {
    if (this.control.multiple) {
      const selection = [];
      let i = from;
      const up = to > from;

      while (up ? i <= to : i >= to) {
        selection.push(this.control.items[i]);
        i += up ? 1 : -1;
      }

      this.persistSelection(selection);
    }
  }

  private selectShift(item: HTMLElement) {
    // only, when selection mode is MULTI
    if (this.control.multiple && this.shiftItem) {
      const indexShift = this.control.items.indexOf(this.shiftItem);
      const indexItem = this.control.items.indexOf(item);

      this.selectRange(indexShift, indexItem);
    } else {
      this.select(item);
    }
  }

  // talk to the control from here

  private persistSelection(selection: Item[]) {
    if (isEqual(selection, this.control.selection)) {
      return;
    }

    for (const element of this.control.items) {
      if (selection.includes(element)) {
        element.setAttribute('aria-selected', 'true');
      } else {
        element.removeAttribute('aria-selected');
      }
    }

    this.control.select(selection);
  }
}
