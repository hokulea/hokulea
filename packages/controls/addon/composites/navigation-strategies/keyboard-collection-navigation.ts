import Composite, { CompositeElement } from '../composite';

export interface KeyboardCollectionNavigationListener {
  navigatePrevious(element: CompositeElement, event: KeyboardEvent): void;
  navigateNext(element: CompositeElement, event: KeyboardEvent): void;
}

/**
 * Collection navigation handles next and previous items
 */
export default abstract class KeyboardCollectionNavigationStrategy {
  private composite: Composite;
  private listener: Set<KeyboardCollectionNavigationListener> = new Set();

  constructor(composite: Composite) {
    this.composite = composite;
  }

  addListener(listener: KeyboardCollectionNavigationListener): void {
    this.listener.add(listener);
  }

  removeListener(listener: KeyboardCollectionNavigationListener): void {
    this.listener.delete(listener);
  }

  navigatePrevious(event: KeyboardEvent): void {
    if (this.composite.elements.length === 0) {
      return;
    }

    // determine previous item
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let previous;
    if (this.composite.focusManagement?.focusElement) {
      const activeIndex = this.composite.elements.indexOf(
        this.composite.focusManagement?.focusElement
      );

      if (activeIndex !== 0) {
        previous = this.composite.elements[activeIndex - 1];
      }
    }

    if (!previous) {
      previous = this.composite.elements[this.composite.elements.length - 1];
    }

    for (const listener of this.listener) {
      listener.navigatePrevious(previous as CompositeElement, event);
    }
  }

  navigateNext(event: KeyboardEvent): void {
    if (this.composite.elements.length === 0) {
      return;
    }

    // determine next item
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let next;
    if (this.composite.focusManagement?.focusElement) {
      const activeIndex = this.composite.elements.indexOf(
        this.composite.focusManagement?.focusElement
      );

      // item is last;
      if (activeIndex !== this.composite.elements.length - 1) {
        next = this.composite.elements[activeIndex + 1];
      }
    }

    if (!next) {
      [next] = this.composite.elements;
    }

    for (const listener of this.listener) {
      listener.navigateNext(next as CompositeElement, event);
    }
  }
}
