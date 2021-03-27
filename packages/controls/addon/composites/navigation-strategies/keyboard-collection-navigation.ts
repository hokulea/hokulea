import Composite, { CompositeElement } from '../composite';

export interface KeyboardCollectionNavigationNotifier {
  navigatePrevious(element: CompositeElement, event: KeyboardEvent): void;
  navigateNext(element: CompositeElement, event: KeyboardEvent): void;
}

/**
 * Collection navigation handles next and previous items
 */
export default abstract class KeyboardCollectionNavigationStrategy {
  private composite: Composite;
  private notifier?: KeyboardCollectionNavigationNotifier;

  protected abstract scrollTowardsPreviousItem: (
    container: HTMLElement,
    item: HTMLElement
  ) => void;

  protected abstract scrollTowardsNextItem: (
    container: HTMLElement,
    item: HTMLElement
  ) => void;

  constructor(
    control: Composite,
    notifier?: KeyboardCollectionNavigationNotifier
  ) {
    this.composite = control;
    this.notifier = notifier;
  }

  navigatePrevious(event: KeyboardEvent): void {
    if (this.composite.elements.length === 0) {
      return;
    }

    // determine previous item
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let previous;
    if (this.composite.focusElement) {
      const activeIndex = this.composite.elements.indexOf(
        this.composite.focusElement
      );

      if (activeIndex !== 0) {
        previous = this.composite.elements[activeIndex - 1];
      }
    }

    if (!previous) {
      previous = this.composite.elements[this.composite.elements.length - 1];
    }

    this.composite.moveFocus(previous);
    this.scrollTowardsPreviousItem(
      this.composite.element,
      previous as HTMLElement
    );
    event.preventDefault();

    this.notifier?.navigatePrevious(previous as HTMLElement, event);
  }

  navigateNext(event: KeyboardEvent): void {
    if (this.composite.elements.length === 0) {
      return;
    }

    // determine next item
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let next;
    if (this.composite.focusElement) {
      const activeIndex = this.composite.elements.indexOf(
        this.composite.focusElement
      );

      // item is last;
      if (activeIndex !== this.composite.elements.length - 1) {
        next = this.composite.elements[activeIndex + 1];
      }
    }

    if (!next) {
      [next] = this.composite.elements;
    }

    this.composite.moveFocus(next);
    this.scrollTowardsNextItem(this.composite.element, next as HTMLElement);
    event.preventDefault();

    this.notifier?.navigatePrevious(next as HTMLElement, event);
  }
}
