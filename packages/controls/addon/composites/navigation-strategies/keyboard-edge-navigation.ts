import Composite, { CompositeElement } from '../composite';
import NavigationStrategy from './navigation-strategy';

export interface KeyboardEdgeNavigationListener {
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
  private listener: Set<KeyboardEdgeNavigationListener> = new Set();

  constructor(control: Composite) {
    this.composite = control;
  }

  addListener(listener: KeyboardEdgeNavigationListener): void {
    this.listener.add(listener);
  }

  removeListener(listener: KeyboardEdgeNavigationListener): void {
    this.listener.delete(listener);
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

    for (const listener of this.listener) {
      listener.navigateHome(item, event);
    }
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

    for (const listener of this.listener) {
      listener.navigateEnd(item, event);
    }
  }
}
