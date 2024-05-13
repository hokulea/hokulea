import { v4 as uuidv4 } from 'uuid';

import type { Control, Item } from '../controls/control';
import type { FocusStrategy } from './focus-strategy';
import type { EventNames, NavigationParameterBag, NavigationPattern } from './navigation-pattern';

export class ActiveDescendentStrategy implements NavigationPattern, FocusStrategy {
  eventListeners: EventNames[] = ['focusin', 'keydown', 'pointerup'];

  activeItem?: Item;
  prevActiveItem?: Item;

  constructor(private control: Control) {}

  matches() {
    return this.control.items.length > 0;
  }

  handle(bag: NavigationParameterBag): NavigationParameterBag {
    const { event, item } = bag;

    if (event.type === 'focusin') {
      this.handleFocus();

      return bag;
    }

    if (item) {
      this.activateItem(item);
    }

    return bag;
  }

  handleFocus() {
    const multiSelection =
      this.control.capabilities.multiSelection && this.control.options.multiple;
    const selectionPresent = this.control.selection.length > 0;

    if (multiSelection && selectionPresent) {
      this.activateItem(this.control.selection[0]);
    } else {
      this.activateItem(this.control.items[0]);
    }
  }

  activateItem(item: Item) {
    if (item === this.activeItem) {
      return;
    }

    // turn passed item active
    item.setAttribute('aria-current', 'true');
    this.control.element.setAttribute('aria-activedescendant', item.id);

    this.prevActiveItem = this.activeItem;
    this.activeItem = item;

    // mark the previous one not active anymore
    this.control.prevActiveItem?.removeAttribute('aria-current');

    this.control.emitter?.itemActivated(item);
  }

  updateItems() {
    // @TODO
    for (const item of this.control.items) {
      if (!item.id) {
        item.id = uuidv4();
      }
    }
  }
}
