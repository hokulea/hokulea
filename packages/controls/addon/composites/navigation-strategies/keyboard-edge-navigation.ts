import Composite, { CompositeElement } from '../composite';
import NavigationStrategy from './navigation-strategy';
import { scrollDownwardsToItem, scrollUpwardsToItem } from './utils';

export interface KeyboardEdgeNavigationNotifier {
  navigateHome(element: CompositeElement, event: KeyboardEvent): void;
  navigateEnd(element: CompositeElement, event: KeyboardEvent): void;
}

/**
 * Keyboard _edge_ navigation handles jumping to the first/last (the edge items)
 * within that control
 */
export default class KeyboardEdgeNavigationStrategy
  implements NavigationStrategy {
  private composite: Composite;
  private notifier?: KeyboardEdgeNavigationNotifier;

  constructor(control: Composite, notifier?: KeyboardEdgeNavigationNotifier) {
    this.composite = control;
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
    if (this.composite.elements.length === 0) {
      return;
    }

    const [item] = this.composite.elements;
    this.composite.moveFocus(item);

    scrollUpwardsToItem(this.composite.element, item);
    event.preventDefault();

    this.notifier?.navigateHome(item, event);
  }

  /**
   * Navigates to the last item
   *
   * @param event
   */
  navigateEnd(event: KeyboardEvent): void {
    if (this.composite.elements.length === 0) {
      return;
    }

    const lastOffset = this.composite.elements.length - 1;
    const item = this.composite.elements[lastOffset];
    this.composite.moveFocus(item);

    scrollDownwardsToItem(this.composite.element, item);
    event.preventDefault();

    this.notifier?.navigateEnd(item, event);
  }
}
