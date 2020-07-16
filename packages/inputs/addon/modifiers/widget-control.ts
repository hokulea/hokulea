import Modifier from 'ember-modifier';

import ControlWidget from './widget-control/control';
import ListboxWidget from './widget-control/listbox';

interface WidgetControlArgs {
  positional: [];
  named: {
    selectionChanged?: (selection: number[]) => void;
    activeItemChanged?: (item: number) => void;
  };
}

export interface Widget {
  readItems(): HTMLElement[];
  readSelection(): HTMLElement[];
  readActiveItem(): HTMLElement | undefined;
}

export default class WidgetControlModifier extends Modifier<WidgetControlArgs> {
  private selection: HTMLElement[] = [];
  private shiftItem?: HTMLElement;
  private activeItem?: HTMLElement;
  private items: HTMLElement[] = [];

  private multiple = false;

  private role?: string;
  private widget?: Widget;

  didInstall() {
    if (this.element) {
      this.element.setAttribute('tabindex', '0');

      this.element.addEventListener('mousedown', (event: MouseEvent) => {
        this.handleMouseEvent(event);
      });
      this.element.addEventListener('keydown', (event: KeyboardEvent) => {
        this.handleKeyEvent(event);
      });
      this.element.addEventListener('focusin', () => {
        this.applyFocus();
      });
    }

    this.read();
  }

  private read() {
    this.readOptions();
    this.readElements();
  }

  private readOptions() {
    this.multiple =
      (this.element?.hasAttribute('aria-multiselectable') &&
        this.element.getAttribute('aria-multiselectable') === 'true') ||
      false;
  }

  private readElements() {
    if (this.element) {
      const role = this.element.getAttribute('role');
      if (role && role !== this.role) {
        this.widget = this.createReader(role, this.element);
        this.role = role;
      }

      if (this.widget) {
        this.items = this.widget.readItems();
        this.selection = this.widget.readSelection();
        this.activeItem = this.widget.readActiveItem();
      }
    }
  }

  private createReader(role: string, element: HTMLElement) {
    if (role === 'listbox') {
      return new ListboxWidget(element);
    }

    return new ControlWidget(element);
  }

  private applyFocus() {
    if (this.items.length === 0) {
      return;
    }

    if (this.selection.length > 0) {
      this.activateItem(this.selection[0]);
    } else {
      this.activateItem(this.items[0]);

      if (!this.multiple) {
        this.select(this.items[0]);
      }
    }
  }

  changeSelection(selection: HTMLElement[]) {
    this.selection = selection;

    const indices = [];
    for (const element of selection) {
      indices.push(this.items.indexOf(element));
    }

    this.args.named.selectionChanged?.(indices);

    this.applySelection(selection);
  }

  private applySelection(selection: HTMLElement[]) {
    for (const element of this.items) {
      if (selection.includes(element)) {
        element.setAttribute('aria-selected', 'true');
      } else {
        element.removeAttribute('aria-selected');
      }
    }
  }

  activateItem(item: HTMLElement) {
    this.applyActiveItem(item);
  }

  private applyActiveItem(item: HTMLElement) {
    // deactivate the existing one first
    if (this.activeItem) {
      this.activeItem.removeAttribute('aria-current');
    }

    // handle the new one
    this.activeItem = item;

    item.setAttribute('aria-current', 'true');
  }

  private handleMouseEvent(event: MouseEvent) {
    const item = event.target as HTMLElement;
    if (item !== null) {
      this.activateItem(item);
      // if (!e.ctrlKey && !e.shiftKey) {
      // 	this.selectAdd(item, false);
      // } else if (e.ctrlKey) {
      // 	this.selectAdd(item);
      // } else

      if (event.shiftKey) {
        this.selectShift(item);
      } else if (event.ctrlKey) {
        if (this.selection.includes(item)) {
          this.deselect(item);
        } else {
          this.selectAdd(item);
        }
      } else {
        this.select(item);
      }
    }
  }

  private handleKeyEvent(event: KeyboardEvent) {
    console.log('control.handleKeyEvent', event);

    this.handleKeyNavigation(event);
    this.handleKeyControl(event);
    // prevent default when scrolling keys are used
    this.preventScrolling(event);
  }

  private handleKeyNavigation(event: KeyboardEvent) {
    // prev
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      this.navigatePrev(event);
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

  private navigatePrev(event: KeyboardEvent) {
    // determine previous item
    let previous;
    if (this.activeItem) {
      const activeIndex = this.items.indexOf(this.activeItem);

      if (activeIndex !== 0) {
        previous = this.items[activeIndex - 1];
      }
    }

    if (previous) {
      this.scrollUpwardsToItem(previous);

      // handle select
      this.activateItem(previous);

      if (this.multiple) {
        if (event.shiftKey) {
          this.selectShift(previous);
        }
      } else {
        this.select(previous);
      }
    }
  }

  private navigateNext(event: KeyboardEvent) {
    // determine next item
    let next;
    if (this.activeItem) {
      const activeIndex = this.items.indexOf(this.activeItem);

      // item is last;
      if (activeIndex !== this.items.length - 1) {
        next = this.items[activeIndex + 1];
      }
    }

    if (next) {
      this.scrollDownwardsToItem(next);

      // handle select and active item
      this.activateItem(next);

      if (this.multiple) {
        if (event.shiftKey) {
          this.selectShift(next);
        }
      } else {
        this.select(next);
      }
    }
  }

  private navigateHome(event: KeyboardEvent) {
    if (this.activeItem) {
      this.shiftItem = this.activeItem;
    }

    if (this.multiple) {
      if (event.shiftKey) {
        this.selectShift(this.items[0]);
      }
    } else {
      this.select(this.items[0]);
    }

    this.activateItem(this.items[0]);
  }

  private navigateEnd(event: KeyboardEvent) {
    const lastOffset = this.items.length - 1;
    if (this.activeItem) {
      this.shiftItem = this.activeItem;
    }

    if (this.multiple) {
      if (event.shiftKey) {
        this.selectShift(this.items[lastOffset]);
      }
    } else {
      this.select(this.items[lastOffset]);
    }

    this.activateItem(this.items[lastOffset]);
  }

  /**
   * Handles special keyboard control cases, such as handling the spacebar key
   * and cmd/ctrl + a
   */
  private handleKeyControl(event: KeyboardEvent) {
    if (event.key === ' ' && this.activeItem) {
      // handle select and active item
      if (this.selection.includes(this.activeItem)) {
        this.deselect(this.activeItem);
      } else {
        this.selectAdd(this.activeItem);
      }
    }

    // ctrl+a
    else if (event.key === 'a' && event.ctrlKey) {
      this.selectAll();
    }
  }

  // selection logic

  deselect(item: HTMLElement) {
    if (this.selection.includes(item)) {
      const selection = this.selection.slice();
      selection.splice(selection.indexOf(item), 1);
      this.changeSelection(selection);
    }
  }

  select(item: HTMLElement) {
    this.shiftItem = item;
    this.changeSelection([item]);
  }

  selectAdd(item: HTMLElement) {
    const selection = this.multiple ? this.selection.slice() : [];
    selection.push(item);

    this.shiftItem = item;
    this.changeSelection(selection);
  }

  selectAll() {
    if (this.multiple) {
      this.changeSelection(this.items);
    }
  }

  selectRange(from: number, to: number) {
    if (this.multiple) {
      const selection = [];
      let i = from;
      const up = to > from;

      while (up ? i <= to : i >= to) {
        selection.push(this.items[i]);
        i += up ? 1 : -1;
      }
      this.changeSelection(selection);
    }
  }

  selectShift(item: HTMLElement) {
    // only, when selection mode is MULTI
    if (this.multiple && this.shiftItem) {
      const indexShift = this.items.indexOf(this.shiftItem);
      const indexItem = this.items.indexOf(item);
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
      (event.key === 'a' && event.ctrlKey)
    ) {
      event.preventDefault();
    }
  }

  private scrollUpwardsToItem(item: HTMLElement) {
    if (
      this.element &&
      (!this.isItemInViewport(item) || item.offsetTop === 0)
    ) {
      this.element.scrollTop = item.offsetTop;
    }
  }

  private scrollDownwardsToItem(item: HTMLElement) {
    if (this.element && !this.isItemInViewport(item)) {
      this.element.scrollTop =
        item.offsetTop - this.element.clientHeight + item.clientHeight;
    }
  }

  private isItemInViewport(item: HTMLElement) {
    const buffer = 2;
    return (
      this.element &&
      (this.element.scrollTop + this.element.clientHeight >=
        item.offsetTop + buffer ||
        this.element.scrollTop + buffer <= item.offsetTop + item.clientHeight)
    );
  }
}
