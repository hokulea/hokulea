import { Control, Item } from '../controls/control';
import { EventNames, NavigationParameterBag, NavigationPattern } from './navigation-pattern';

export class ActiveDescendentStrategy implements NavigationPattern {
  eventListeners: EventNames[] = ['focusin'];

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

    if (!item) {
      return bag;
    }

    if (event.type === 'keydown') {
      this.scrollToItem(item);

      // prevent default when scrolling keys are used
      this.preventScrolling(event as KeyboardEvent);
    }

    if (event.type === 'mouseup' && item) {
      event.stopPropagation();
    }

    this.activateItem(item);

    return bag;
  }

  handleFocus() {
    if (this.control.capabilities.multiSelection && this.control.selection.length > 0) {
      this.activateItem(this.control.selection[0]);
    } else if (
      this.control.capabilities.singleSelection && this.control.selection.length > 0
        || !(this.control.capabilities.singleSelection || this.control.capabilities.multiSelection)
    ) {
      this.activateItem(this.control.items[0]);
    }

      // if (!this.multiple) {
      //   this.select([this.items[0]]);
      // }
  }

  activateItem(item: Item) {
    this.control.prevActiveItem?.removeAttribute('aria-current');
    item.setAttribute('aria-current', 'true');

    this.control.element.setAttribute('aria-activedescendant', item.id);

    this.control.activateItem(item);
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
    if (this.control.element && (!this.isItemInViewport(item) || item.offsetTop === 0)) {
      this.control.element.scrollTop = item.offsetTop;
    }
  }

  private scrollDownwardsToItem(item: HTMLElement) {
    if (this.control.element && !this.isItemInViewport(item)) {
      this.control.element.scrollTop =
        item.offsetTop - this.control.element.clientHeight + item.clientHeight;
    }
  }

  private isItemInViewport(item: HTMLElement) {
    const buffer = 2;

    return (
      this.control.element &&
      (this.control.element.scrollTop + this.control.element.clientHeight >=
        item.offsetTop + buffer ||
        this.control.element.scrollTop + buffer <= item.offsetTop + item.clientHeight)
    );
  }
}
