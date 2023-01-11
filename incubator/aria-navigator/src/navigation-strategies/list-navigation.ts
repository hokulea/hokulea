import type { Control, Item } from '../controls/control';

export class ListNavigationStrategy {
  private control: Control;

  private shiftItem?: Item;

  constructor(control: Control) {
    this.control = control;
  }

  navigate(event: Event) {
    if (event instanceof MouseEvent) {
      this.navigateWithMouse(event);
    }

    if (event instanceof KeyboardEvent) {
      this.navigateWithKeyboard(event);
    }
  }

  private navigateWithMouse(event: MouseEvent) {
    const item = event.target as HTMLElement;

    if (item !== null) {
      this.control.activateItem(item);
      event.stopPropagation();

      if (event.shiftKey) {
        this.selectShift(item);
      } else if (event.metaKey) {
        if (this.control.selection.includes(item)) {
          this.deselect(item);
        } else {
          this.selectAdd(item);
        }
      } else {
        this.select(item);
      }
    }
  }

  private navigateWithKeyboard(event: KeyboardEvent) {
    if (event.type === 'keydown') {
      this.handleKeyNavigation(event);
      this.handleKeyCombinations(event);
      // prevent default when scrolling keys are used
      this.preventScrolling(event);
    } else if (event.type === 'keyup' && !event.shiftKey) {
      this.shiftItem = undefined;
    }
  }

  private handleKeyNavigation(event: KeyboardEvent) {
    // prev
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      this.navigatePrevious(event);
    }

    // next
    else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      this.navigateNext(event);
    }

    // home
    else if (event.key === 'Home') {
      this.navigateHome(event);
    }

    // end
    else if (event.key === 'End') {
      this.navigateEnd(event);
    }
  }

  navigatePrevious(event: KeyboardEvent) {
    // determine previous item
    let previous;

    if (this.control.activeItem) {
      const activeIndex = this.control.items.indexOf(this.control.activeItem);

      if (activeIndex !== 0) {
        previous = this.control.items[activeIndex - 1];
      }
    }

    if (previous) {
      this.scrollUpwardsToItem(previous);

      // handle select
      this.control.activateItem(previous);

      if (this.control.multiple) {
        if (event.shiftKey) {
          this.selectShift(previous);
        }
      } else {
        this.select(previous);
      }
    } else {
      this.navigateEnd(event);
    }
  }

  navigateNext(event: KeyboardEvent) {
    // determine next item
    let next;

    if (this.control.activeItem) {
      const activeIndex = this.control.items.indexOf(this.control.activeItem);

      // item is last;
      if (activeIndex !== this.control.items.length - 1) {
        next = this.control.items[activeIndex + 1];
      }
    }

    if (next) {
      this.scrollDownwardsToItem(next);

      // handle select and active item
      this.control.activateItem(next);

      if (this.control.multiple) {
        if (event.shiftKey) {
          this.selectShift(next);
        }
      } else {
        this.select(next);
      }
    } else {
      this.navigateHome(event);
    }
  }

  navigateHome(event: KeyboardEvent) {
    if (this.control.activeItem) {
      this.shiftItem = this.control.activeItem;
    }

    if (this.control.multiple) {
      if (event.shiftKey) {
        this.selectShift(this.control.items[0]);
      }
    } else {
      this.select(this.control.items[0]);
    }

    this.control.activateItem(this.control.items[0]);
  }

  navigateEnd(event: KeyboardEvent) {
    const lastOffset = this.control.items.length - 1;

    if (this.control.activeItem) {
      this.shiftItem = this.control.activeItem;
    }

    if (this.control.multiple) {
      if (event.shiftKey) {
        this.selectShift(this.control.items[lastOffset]);
      }
    } else {
      this.select(this.control.items[lastOffset]);
    }

    this.control.activateItem(this.control.items[lastOffset]);
  }

  /**
   * Handles special keyboard control cases, such as handling the spacebar key
   * and cmd/ctrl + a
   */
  private handleKeyCombinations(event: KeyboardEvent) {
    if (event.key === ' ' && this.control.activeItem && this.control.multiple) {
      // handle select and active item
      if (this.control.selection.includes(this.control.activeItem)) {
        this.deselect(this.control.activeItem);
      } else {
        this.selectAdd(this.control.activeItem);
      }
    }

    // ctrl+a
    else if ((event.key === 'KeyA' || event.key === 'a') && event.metaKey) {
      this.selectAll();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // selection logic

  deselect(item: HTMLElement) {
    if (this.control.selection.includes(item)) {
      const selection = this.control.selection.slice();

      selection.splice(selection.indexOf(item), 1);
      this.control.select(selection);
    }
  }

  select(item: HTMLElement) {
    this.shiftItem = item;

    this.control.select([item]);
  }

  selectAdd(item: HTMLElement) {
    const selection = this.control.multiple ? this.control.selection.slice() : [];

    selection.push(item);

    this.shiftItem = item;
    this.control.select(selection);
  }

  selectAll() {
    if (this.control.multiple) {
      this.control.select(this.control.items);
    }
  }

  selectRange(from: number, to: number) {
    if (this.control.multiple) {
      const selection = [];
      let i = from;
      const up = to > from;

      while (up ? i <= to : i >= to) {
        selection.push(this.control.items[i]);
        i += up ? 1 : -1;
      }

      this.control.select(selection);
    }
  }

  selectShift(item: HTMLElement) {
    // only, when selection mode is MULTI
    if (this.control.multiple && this.shiftItem) {
      const indexShift = this.control.items.indexOf(this.shiftItem);
      const indexItem = this.control.items.indexOf(item);

      this.selectRange(indexShift, indexItem);
    } else {
      this.select(item);
    }
  }

  // utils

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
