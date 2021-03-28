import { CompositeElement } from '../composite';
import NavigationStrategy from './navigation-strategy';

export interface MouseInvokeNavigationListener {
  invoke(element: CompositeElement, event: MouseEvent): void;
}

/**
 * Horizontal keyboard navigation coordinates left and right arrow keys
 */
export default class MouseInvokeNavigationStrategy
  implements NavigationStrategy {
  private listener: Set<MouseInvokeNavigationListener> = new Set();

  addListener(listener: MouseInvokeNavigationListener): void {
    this.listener.add(listener);
  }

  removeListener(listener: MouseInvokeNavigationListener): void {
    this.listener.delete(listener);
  }

  navigate(event: Event): void {
    if (event instanceof MouseEvent && event.type === 'mousedown') {
      const element = event.target as CompositeElement;
      if (element !== null) {
        for (const listener of this.listener) {
          listener.invoke(element, event);
        }
      }
    }
  }
}
