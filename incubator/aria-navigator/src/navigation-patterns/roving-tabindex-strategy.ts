import { isItemEnabled } from '../controls/-utils';
import { type Control, type Item } from '../controls/control';

import type { FocusStrategy } from './focus-strategy';
import type { EventNames, NavigationParameterBag, NavigationPattern } from './navigation-pattern';

/**
 * @see https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export class RovingTabindexStrategy implements NavigationPattern, FocusStrategy {
  eventListeners: EventNames[] = ['focus', 'focusin'];

  activeItem?: Item;
  prevActiveItem?: Item;

  constructor(private control: Control) {}

  matches() {
    return this.control.enabledItems.length > 0;
  }

  handle(bag: NavigationParameterBag): NavigationParameterBag {
    const { event, item } = bag;

    if (event.type === 'focusin' && !this.activeItem) {
      if (this.control.element === event.target) {
        this.activateItem(this.control.enabledItems[0]);
      } else if (this.control.enabledItems.includes(event.target as Item)) {
        this.activateItem(event.target as Item);
      }

      return bag;
    }

    if (item) {
      this.activateItem(item);
    }

    return bag;
  }

  activateItem(item: Item) {
    if (item !== this.activeItem) {
      // turn passed item active
      item.setAttribute('tabindex', '0');

      this.prevActiveItem = this.activeItem;

      // mark the previous one not active anymore
      this.control.prevActiveItem?.setAttribute('tabindex', '-1');
    }

    item.focus();

    if (item !== this.activeItem) {
      this.activeItem = item;
      this.control.emitter?.itemActivated(item);
    }
  }

  updateItems() {
    for (const item of this.control.items) {
      item.setAttribute('tabindex', '-1');
    }

    if (this.control.options.disabled) {
      this.activeItem?.setAttribute('tabindex', '-1');
      this.activeItem = undefined;
    } else {
      if (this.activeItem && isItemEnabled(this.activeItem)) {
        this.activeItem.setAttribute('tabindex', '0');
      } else {
        this.activeItem = undefined;
      }

      if (!this.activeItem && this.control.enabledItems.length > 0) {
        this.control.enabledItems[0].setAttribute('tabindex', '0');
      }
    }
  }
}
