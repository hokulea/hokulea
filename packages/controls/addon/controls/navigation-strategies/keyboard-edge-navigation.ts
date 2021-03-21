import Control, { Item } from '../control';
import NavigationStrategy from './navigation-strategy';
import { scrollDownwardsToItem, scrollUpwardsToItem } from './utils';

export interface KeyboardEdgeNavigationNotifier {
  navigateHome(item: Item, event: KeyboardEvent): void;
  navigateEnd(item: Item, event: KeyboardEvent): void;
}

/**
 * Keyboard _edge_ navigation handles jumping to the first/last (the edge items)
 * within that control
 */
export default class KeyboardEdgeNavigationStrategy
  implements NavigationStrategy {
  private control: Control;
  private notifier?: KeyboardEdgeNavigationNotifier;

  constructor(control: Control, notifier?: KeyboardEdgeNavigationNotifier) {
    this.control = control;
    this.notifier = notifier;
  }

  navigate(event: Event): void {
    if (event instanceof KeyboardEvent && event.type === 'keydown') {
      // home
      if (event.key === 'Home') {
        this.navigateHome(event);
      }

      // end
      else if (event.key === 'End') {
        this.navigateEnd(event);
      }
    }
  }

  /**
   * Navigates to the first item
   *
   * @param event
   */
  navigateHome(event: KeyboardEvent): void {
    if (this.control.items.length === 0) {
      return;
    }

    const [item] = this.control.items;
    this.control.activateItem(item);

    scrollUpwardsToItem(this.control.element, item);
    event.preventDefault();

    this.notifier?.navigateHome(item, event);
  }

  /**
   * Navigates to the last item
   *
   * @param event
   */
  navigateEnd(event: KeyboardEvent): void {
    if (this.control.items.length === 0) {
      return;
    }

    const lastOffset = this.control.items.length - 1;
    const item = this.control.items[lastOffset];
    this.control.activateItem(item);

    scrollDownwardsToItem(this.control.element, item);
    event.preventDefault();

    this.notifier?.navigateEnd(item, event);
  }
}
