import type { Control, Item } from '../controls/control';
import type { EventNames, NavigationParameterBag, NavigationPattern } from './navigation-pattern';

export class ScrollToItem implements NavigationPattern {
  eventListeners: EventNames[] = ['keydown'];

  constructor(private control: Control) {}

  matches() {
    return this.control.items.length > 0;
  }

  handle(bag: NavigationParameterBag): NavigationParameterBag {
    const { event, item } = bag;

    if (event.type === 'keydown') {
      if (item) {
        this.scrollToItem(item);
      }

      // prevent default when scrolling keys are used
      this.preventScrolling(event as KeyboardEvent);
    }

    // if (event.type === 'pointerup' && item) {
    //   event.stopPropagation();
    // }

    return bag;
  }

  private preventScrolling(event: KeyboardEvent) {
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'PageUp' ||
      event.key === 'PageDown' ||
      event.key === 'Home' ||
      event.key === 'End' ||
      event.key === ' ' ||
      (event.key === 'a' && event.metaKey)
    ) {
      event.preventDefault();
    }
  }

  private scrollToItem(item: Item) {
    if (
      this.control.prevActiveItem &&
      this.control.items.indexOf(this.control.prevActiveItem) < this.control.items.indexOf(item)
    ) {
      this.scrollUpwardsToItem(item);
    } else {
      this.scrollDownwardsToItem(item);
    }
  }

  private scrollUpwardsToItem(item: HTMLElement) {
    if (!this.isItemInViewport(item) || item.offsetTop === 0) {
      this.control.element.scrollTop = item.offsetTop;
    }
  }

  private scrollDownwardsToItem(item: HTMLElement) {
    if (!this.isItemInViewport(item)) {
      this.control.element.scrollTop =
        item.offsetTop - this.control.element.clientHeight + item.clientHeight;
    }
  }

  private isItemInViewport(item: HTMLElement) {
    const buffer = 2;

    return (
      this.control.element.scrollTop + this.control.element.clientHeight >=
        item.offsetTop + buffer ||
      this.control.element.scrollTop + buffer <= item.offsetTop + item.clientHeight
    );
  }
}
