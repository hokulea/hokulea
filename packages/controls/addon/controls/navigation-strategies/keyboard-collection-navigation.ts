import Control, { Item } from '../control';

export interface KeyboardCollectionNavigationNotifier {
  navigatePrevious(item: Item, event: KeyboardEvent): void;
  navigateNext(item: Item, event: KeyboardEvent): void;
}

/**
 * Collection navigation handles next and previous items
 */
export default abstract class KeyboardCollectionNavigationStrategy {
  private control: Control;
  private notifier?: KeyboardCollectionNavigationNotifier;

  protected declare scrollTowardsPreviousItem: (
    container: HTMLElement,
    item: HTMLElement
  ) => void;

  protected declare scrollTowardsNextItem: (
    container: HTMLElement,
    item: HTMLElement
  ) => void;

  constructor(
    control: Control,
    notifier?: KeyboardCollectionNavigationNotifier
  ) {
    this.control = control;
    this.notifier = notifier;
  }

  navigatePrevious(event: KeyboardEvent): void {
    if (this.control.items.length === 0) {
      return;
    }

    // determine previous item
    let previous;
    if (this.control.activeItem) {
      const activeIndex = this.control.items.indexOf(this.control.activeItem);

      if (activeIndex !== 0) {
        previous = this.control.items[activeIndex - 1];
      }
    } else {
      previous = this.control.items[this.control.items.length - 1];
    }

    // handle select
    this.control.activateItem(previous);
    this.scrollTowardsPreviousItem(
      this.control.element,
      previous as HTMLElement
    );
    event.preventDefault();

    this.notifier?.navigatePrevious(previous as HTMLElement, event);
  }

  navigateNext(event: KeyboardEvent): void {
    if (this.control.items.length === 0) {
      return;
    }

    // determine next item
    let next;
    if (this.control.activeItem) {
      const activeIndex = this.control.items.indexOf(this.control.activeItem);

      // item is last;
      if (activeIndex !== this.control.items.length - 1) {
        next = this.control.items[activeIndex + 1];
      }
    } else {
      [next] = this.control.items;
    }

    this.control.activateItem(next);
    this.scrollTowardsNextItem(this.control.element, next as HTMLElement);
    event.preventDefault();

    this.notifier?.navigatePrevious(next as HTMLElement, event);
  }
}
