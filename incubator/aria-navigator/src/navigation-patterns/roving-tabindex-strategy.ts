import type { Control, Item } from '../controls/control';
import type { FocusStrategy } from './focus-strategy';
import type { EventNames, NavigationParameterBag, NavigationPattern } from './navigation-pattern';

/**
 * @see https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export class RovingTabindexStrategy implements NavigationPattern, FocusStrategy {
  eventListeners: EventNames[] = ['focusin'];

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
    if (!this.activeItem) {
      this.activateItem(this.control.items[0]);
    }
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
}
